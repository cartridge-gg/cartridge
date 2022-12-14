import { time } from "console";
import {
  constants,
  hash,
  number,
  Account as BaseAccount,
  RpcProvider,
  SignerInterface,
  GetTransactionReceiptResponse,
  Call,
  EstimateFeeDetails,
  EstimateFee,
} from "starknet";

import { CONTROLLER_CLASS } from "./constants";
import selectors from "./selectors";
import Storage from "./storage";

class Account extends BaseAccount {
  private rpc: RpcProvider;
  private selector: string;
  deployed: boolean = false;
  deploying: boolean = false;
  registered: boolean = false;

  constructor(
    chainId: constants.StarknetChainId,
    nodeUrl: string,
    address: string,
    signer: SignerInterface,
  ) {
    super({ rpc: { nodeUrl } }, address, signer);
    this.rpc = new RpcProvider({ nodeUrl });
    this.selector = selectors["0.0.3"].deployment(address, chainId);
    const state = Storage.get(this.selector);

    if (state) {
      this.deployed = state.deployed;
      this.registered = state.registered;
    }

    if (!state || Date.now() - state.syncing > 5000) {
      this.sync();
      return;
    }

    this.deployed = state.deployed;
    this.registered = state.registered;

    if (!state || Date.now() - state.syncing > 5000) {
      this.sync();
      return;
    }
  }

  async sync() {
    Storage.update(this.selector, {
      syncing: Date.now(),
    });

    try {
      this.deploying = await this.isDeploying();

      const classHash = await this.rpc.getClassHashAt(this.address, "latest");
      Storage.update(this.selector, {
        classHash,
        deployed: true,
      });
      this.deployed = true;

      const nonce = await this.rpc.getNonceForAddress(this.address, "latest");
      Storage.update(this.selector, {
        nonce,
      });

      const pub = await this.signer.getPubKey();
      const res = await this.rpc.callContract(
        {
          contractAddress: this.address,
          entrypoint: "executeOnPlugin",
          calldata: [
            CONTROLLER_CLASS,
            hash.getSelector("is_public_key"),
            "0x1",
            pub,
          ],
        },
        "latest",
      );

      this.registered = number.toBN(res.result[1]).eq(number.toBN(1));
      Storage.update(this.selector, {
        registered: this.registered,
      });
    } catch (e) {
      /* no-op */
    }
  }

  async isDeploying(): Promise<boolean> {
    const deployTx = Storage.get(this.selector).deployTx;
    if (deployTx && !this.deployed) {
      const receipt = (await this.rpc.getTransactionReceipt(
        deployTx,
      )) as GetTransactionReceiptResponse;
      if (receipt.status === "RECEIVED" || receipt.status === "PENDING") {
        return true;
      }
    }
    return false;
  }

  async estimateInvokeFee(
    calls: Call[],
    details: EstimateFeeDetails = {},
  ): Promise<EstimateFee> {
    details.blockIdentifier = details.blockIdentifier
      ? details.blockIdentifier
      : "latest";
    return super.estimateInvokeFee(calls, details);
  }

  async getNonce(blockIdentifier?: any): Promise<number.BigNumberish> {
    if (
      blockIdentifier &&
      (blockIdentifier !== "latest" || blockIdentifier !== "pending")
    ) {
      return super.getNonce(blockIdentifier);
    }

    const deployment = Storage.get(this.selector);
    if (!deployment || !deployment.nonce) {
      return "0x0";
    }

    return deployment.nonce;
  }
}

export default Account;
