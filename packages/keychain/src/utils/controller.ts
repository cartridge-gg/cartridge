import {
  constants,
  ec,
  Invocation,
  InvocationsDetails,
  SignerInterface,
  BigNumberish,
  num,
} from "starknet";
import equal from "fast-deep-equal";

import { Policy, Session } from "@cartridge/controller";

import Storage from "utils/storage";

import Account from "./account";
import { DeviceSigner } from "./signer";
import WebauthnAccount, { RawAssertion } from "./webauthn";
import selectors from "./selectors";
import migrations from "./migrations";
import { AccountInfoDocument } from "generated/graphql";
import { client } from "./graphql";

export const VERSION = "0.0.3";

export type InvocationWithDetails = {
  invocation: Invocation;
  details: InvocationsDetails;
};

export type RegisterData = {
  assertion: RawAssertion;
  invoke: InvocationWithDetails;
};

type SerializedController = {
  credentialId: string;
  privateKey: string;
  publicKey: string;
  address: string;
};

export default class Controller {
  public address: string;
  public signer: SignerInterface;
  public publicKey: string;
  protected privateKey: string;
  protected credentialId: string;
  protected accounts: Account[];

  constructor(
    privateKey: string,
    address: string,
    credentialId: string,
    options?: {
      rpId?: string;
    },
  ) {
    this.address = address;
    this.signer = new DeviceSigner(privateKey);
    this.privateKey = privateKey;
    this.publicKey = ec.starkCurve.getStarkKey(privateKey);
    this.credentialId = credentialId;

    this.accounts = [
      // TODO: Enable once controller is ready for mainnet
      // [constants.StarknetChainId.SN_MAIN]: new Account(
      //   constants.StarknetChainId.SN_MAIN,
      //   process.env.NEXT_PUBLIC_RPC_MAINNET,
      //   address,
      //   this.signer,
      //   new WebauthnAccount(
      //     process.env.NEXT_PUBLIC_RPC_MAINNET,
      //     address,
      //     credentialId,
      //     this.publicKey,
      //     options,
      //   ),
      // ),
      new Account(
        constants.StarknetChainId.SN_SEPOLIA,
        process.env.NEXT_PUBLIC_RPC_SEPOLIA,
        address,
        this.signer,
        new WebauthnAccount(
          process.env.NEXT_PUBLIC_RPC_SEPOLIA,
          address,
          credentialId,
          this.publicKey,
          options,
        ),
      ),
    ];

    Storage.set(
      selectors[VERSION].admin(this.address, process.env.NEXT_PUBLIC_ADMIN_URL),
      {},
    );
    Storage.set(selectors["0.0.3"].active(), address);
    this.store();
  }

  async getUser() {
    const res = await client.request(AccountInfoDocument, {
      id: this.address,
    });

    const account = res.accounts?.edges?.[0]?.node;
    if (!account) {
      throw new Error("User not found");
    }

    return {
      address: this.address,
      name: account.id,
      profileUri: `https://cartridge.gg/profile/${this.address}`,
    };
  }

  account(chainId: constants.StarknetChainId): Account | undefined {
    return this.accounts.find((a) => a._chainId === chainId);
  }

  delete() {
    return Storage.clear();
  }

  approve(origin: string, policies: Policy[], maxFee?: BigNumberish) {
    Storage.set(selectors[VERSION].session(this.address, origin), {
      policies,
      maxFee,
    });
  }

  revoke(origin: string) {
    Storage.remove(selectors[VERSION].session(this.address, origin));
  }

  session(origin: string): Session | undefined {
    return Storage.get(selectors[VERSION].session(this.address, origin));
  }

  sessions(): { [key: string]: Session } | undefined {
    return Storage.keys()
      .filter((k) => k.startsWith(selectors[VERSION].session(this.address, "")))
      .reduce((prev, key) => {
        prev[key.slice(9)] = Storage.get(key);
        return prev;
      }, {} as { [key: string]: Session });
  }

  store() {
    Storage.set("version", VERSION);
    return Storage.set(selectors[VERSION].account(this.address), {
      privateKey: num.toHex(this.privateKey),
      publicKey: this.publicKey,
      address: this.address,
      credentialId: this.credentialId,
    });
  }

  static fromStore() {
    const version = Storage.get("version");
    if (!version) {
      return;
    }

    let controller: SerializedController;
    if (version === "0.0.2") {
      controller = Storage.get(selectors["0.0.2"].account());
    } else if (version === "0.0.3") {
      const active = Storage.get(selectors["0.0.3"].active());
      controller = Storage.get(selectors["0.0.3"].account(active));
    }

    if (!controller) {
      return;
    }

    const { credentialId, privateKey, address } = controller;

    if (version !== VERSION) {
      migrations[version][VERSION](address);
    }

    return new Controller(privateKey, address, credentialId);
  }
}

export function diff(a: Policy[], b: Policy[]): Policy[] {
  return a.reduce(
    (prev, policy) =>
      b.some((approval) => equal(approval, policy)) ? prev : [...prev, policy],
    [] as Policy[],
  );
}
