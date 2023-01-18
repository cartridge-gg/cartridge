import qs from "query-string";
import { AccountInterface, constants, number, RpcProvider } from "starknet";
import {
  AsyncMethodReturns,
  Connection,
  connectToChild,
} from "@cartridge/penpal";

import DeviceAccount from "./device";
import {
  Session,
  Keychain,
  Policy,
  ResponseCodes,
  ConnectReply,
  ProbeReply,
  Modal,
} from "./types";
import BN from "bn.js";

export const providers = {
  [constants.StarknetChainId.TESTNET]: new RpcProvider({
    nodeUrl: "https://starknet-goerli.cartridge.gg/rpc/v0.2",
  }),
  [constants.StarknetChainId.TESTNET2]: new RpcProvider({
    nodeUrl: "https://starknet-goerli2.cartridge.gg/rpc/v0.2",
  }),
  [constants.StarknetChainId.MAINNET]: new RpcProvider({
    nodeUrl: "https://starknet.cartridge.gg/rpc/v0.2",
  }),
};

class Controller {
  private connection?: Connection<Keychain>;
  public keychain?: AsyncMethodReturns<Keychain>;
  private policies: Policy[] = [];
  private url: string = "https://x.cartridge.gg";
  public chainId: constants.StarknetChainId = constants.StarknetChainId.TESTNET;
  public accounts?: { [key in constants.StarknetChainId]: AccountInterface };
  private modal?: Modal;

  constructor(
    policies?: Policy[],
    options?: {
      url?: string;
      origin?: string;
    }
  ) {
    if (policies) {
      this.policies = policies;
    }

    if (options?.url) {
      this.url = options.url;
    }

    if (typeof document === "undefined") {
      return;
    }

    this.modal = this.createModal();

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      document.body.appendChild(this.modal.element);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(this.modal!.element);
      });
    }

    this.connection = connectToChild<Keychain>({
      iframe: this.modal.element.children[0] as HTMLIFrameElement,
    });

    this.connection.promise
      .then((keychain) => (this.keychain = keychain))
      .then(() => this.probe());
  }

  get account() {
    if (!this.accounts) {
      return;
    }
    return this.accounts[this.chainId];
  }

  async ready() {
    return this.connection?.promise
      .then(() => this.probe())
      .then(
        (res) => !!res,
        () => false
      );
  }

  async probe() {
    if (!this.keychain || !this.modal) {
      console.error("not ready for connect");
      return null;
    }

    try {
      const res = await this.keychain.probe();
      if (res.code !== ResponseCodes.SUCCESS) {
        return;
      }

      const { address } = res as ProbeReply;
      this.accounts = {
        [constants.StarknetChainId.MAINNET]: new DeviceAccount(
          providers[constants.StarknetChainId.MAINNET],
          address,
          this.keychain,
          this.modal
        ),
        [constants.StarknetChainId.TESTNET]: new DeviceAccount(
          providers[constants.StarknetChainId.TESTNET],
          address,
          this.keychain,
          this.modal
        ),
        [constants.StarknetChainId.TESTNET2]: new DeviceAccount(
          providers[constants.StarknetChainId.TESTNET2],
          address,
          this.keychain,
          this.modal
        ),
      };
    } catch (e) {
      console.error(e);
      return;
    }

    return !!this.accounts[this.chainId];
  }

  async switchChain(chainId: constants.StarknetChainId) {
    if (this.chainId === chainId) {
      return;
    }

    this.chainId = chainId;
  }

  // Register a new device key.
  async register(
    username: string,
    credentialId: string,
    credential: { x: string; y: string }
  ) {
    if (!this.keychain) {
      console.error("not ready for connect");
      return null;
    }

    return await this.keychain.register(username, credentialId, credential);
  }

  async login(
    address: string,
    credentialId: string,
    options: {
      rpId?: string;
      challengeExt?: Buffer;
    }
  ) {
    if (!this.keychain) {
      console.error("not ready for connect");
      return null;
    }

    return this.keychain.login(address, credentialId, options);
  }

  async provision(address: string, credentialId: string) {
    if (!this.keychain) {
      console.error("not ready for connect");
      return null;
    }

    return this.keychain.provision(address, credentialId);
  }

  async connect() {
    if (this.accounts) {
      return this.accounts[this.chainId];
    }

    if (!this.keychain || !this.modal) {
      console.error("not ready for connect");
      return;
    }

    if (!!document.hasStorageAccess) {
      const ok = await document.hasStorageAccess();
      if (!ok) {
        await document.requestStorageAccess();
      }
    }

    this.modal.open();

    try {
      let response = await this.keychain.connect(this.policies);
      if (response.code !== ResponseCodes.SUCCESS) {
        throw new Error(response.message);
      }

      response = response as ConnectReply;
      this.accounts = {
        [constants.StarknetChainId.MAINNET]: new DeviceAccount(
          providers[constants.StarknetChainId.MAINNET],
          response.address,
          this.keychain,
          this.modal
        ),
        [constants.StarknetChainId.TESTNET]: new DeviceAccount(
          providers[constants.StarknetChainId.TESTNET],
          response.address,
          this.keychain,
          this.modal
        ),
        [constants.StarknetChainId.TESTNET2]: new DeviceAccount(
          providers[constants.StarknetChainId.TESTNET2],
          response.address,
          this.keychain,
          this.modal
        ),
      };
      return this.accounts[this.chainId];
    } catch (e) {
      console.log(e);
    } finally {
      this.modal.close();
    }
  }

  async disconnect() {
    if (!this.keychain) {
      console.error("not ready for disconnect");
      return null;
    }

    if (!!document.hasStorageAccess) {
      const ok = await document.hasStorageAccess();
      if (!ok) {
        await document.requestStorageAccess();
      }
    }

    return await this.keychain.disconnect();
  }

  revoke(origin: string, policy: Policy[]) {
    if (!this.keychain) {
      console.error("not ready for disconnect");
      return null;
    }

    return this.keychain.revoke(origin);
  }

  async approvals(origin: string): Promise<Session | undefined> {
    if (!this.keychain) {
      console.error("not ready for disconnect");
      return;
    }

    return this.keychain.approvals(origin);
  }

  private createModal() {
    const iframe = document.createElement("iframe");
    iframe.src = this.url;
    iframe.id = "cartridge-modal";
    iframe.style.minHeight = "600px";
    iframe.style.minWidth = "400px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "8px";
    iframe.sandbox.add("allow-forms");
    iframe.sandbox.add("allow-popups");
    iframe.sandbox.add("allow-scripts");
    iframe.sandbox.add("allow-same-origin");
    iframe.allow = "publickey-credentials-get *";
    if (!!document.hasStorageAccess) {
      iframe.sandbox.add("allow-storage-access-by-user-activation");
    }

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.height = "100%";
    container.style.width = "100%";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "10000";
    container.style.backgroundColor = "rgba(0,0,0,0.5)";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.display = "none";
    container.appendChild(iframe);

    const open = () => {
      container.style.display = "flex";
    };

    const close = () => {
      this.keychain?.reset();
      container.style.display = "none";
    };

    container.onclick = () => close();

    return {
      element: container,
      open,
      close,
    };
  }
}

const BASE = number.toBN(2).pow(number.toBN(86));

export function split(n: BN): {
  x: BN;
  y: BN;
  z: BN;
} {
  const x = n.mod(BASE);
  const y = n.div(BASE).mod(BASE);
  const z = n.div(BASE).div(BASE);
  return { x, y, z };
}

export * from "./types";
export * from "./errors";
export { injectController } from "./inject";
export default Controller;
