import {
  AccountContractDocument,
  useAccountContractQuery,
} from "generated/graphql";
import {
  constants,
  hash,
  number,
  Account as BaseAccount,
  RpcProvider,
  SignerInterface,
  Call,
  EstimateFeeDetails,
  EstimateFee,
} from "starknet";
import { CLASS_HASHES } from "./hashes";
import { client } from "utils/graphql";

import selectors from "./selectors";
import Storage from "./storage";
import { NamedChainId } from "./constants";

export enum Status {
  UNKNOWN = "UNKNOWN",
  COUNTERFACTUAL = "COUNTERFACTUAL",
  DEPLOYING = "DEPLOYING",
  DEPLOYED = "DEPLOYED",
  REGISTERING = "REGISTERING",
  REGISTERED = "REGISTERED",
}

class Account extends BaseAccount {
  private rpc: RpcProvider;
  private selector: string;
  _chainId: constants.StarknetChainId;
  deployed: boolean = false;
  registered: boolean = false;
  updated: boolean = true;
  status: Status = Status.UNKNOWN;

  constructor(
    chainId: constants.StarknetChainId,
    nodeUrl: string,
    address: string,
    signer: SignerInterface,
  ) {
    super({ rpc: { nodeUrl } }, address, signer);
    this.rpc = new RpcProvider({ nodeUrl });
    this.selector = selectors["0.0.3"].deployment(address, chainId);
    this._chainId = chainId;
    const state = Storage.get(this.selector);

    if (state) {
      this.deployed = !!state.deployed;
      this.registered = !!state.registered;
    }

    if (!state || Date.now() - state.syncing > 5000) {
      this.sync();
      return;
    }
  }

  async getContract() {
    try {
      return await client.request(AccountContractDocument, {
        id: `starknet:${NamedChainId[this._chainId]}:${this.address}`,
      });
    } catch (e) {
      if (e.message.includes("not found")) {
        return null;
      }

      throw e;
    }
  }

  async sync() {
    Storage.update(this.selector, {
      syncing: Date.now(),
    });

    try {
      if (!this.deployed || !this.registered) {
        const registerTxnHash = Storage.get(this.selector).registerTxnHashHash;
        if (registerTxnHash) {
          this.status = Status.REGISTERING;
          this.rpc
            .waitForTransaction(registerTxnHash, 1000, ["ACCEPTED_ON_L1", "ACCEPTED_ON_L2"])
            .then(() => this.sync());
          return;
        }

        const data = await this.getContract();
        if (!data?.contract?.deployTransaction?.id) {
          this.status = Status.COUNTERFACTUAL;
          return;
        }

        const deployTxnHash = data.contract.deployTransaction.id.split("/")[1];
        const deployTxnReceipt = await this.rpc.getTransactionReceipt(deployTxnHash);

        // Pending txn so poll for inclusion.
        if (!('status' in deployTxnReceipt)) {
          this.status = Status.DEPLOYING;
          this.rpc
            .waitForTransaction(deployTxnHash, 1000, ["ACCEPTED_ON_L1", "ACCEPTED_ON_L2"])
            .then(() => this.sync());
          return
        }

        if (deployTxnReceipt.status === "REJECTED") {
          this.status = Status.COUNTERFACTUAL;
          return;
        }
      }

      const classHash = await this.rpc.getClassHashAt(this.address, "latest");
      Storage.update(this.selector, {
        classHash,
        deployed: true,
        status: Status.DEPLOYED,
      });
      this.deployed = true;
      this.status = Status.DEPLOYED;

      if (classHash !== CLASS_HASHES["latest"].account) {
        this.updated = false;
      }

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
            CLASS_HASHES["0.0.1"].controller,
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
      console.log(e);
    }
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

  // async getNonce(blockIdentifier?: any): Promise<number.BigNumberish> {
  //   if (
  //     blockIdentifier &&
  //     (blockIdentifier !== "latest" || blockIdentifier !== "pending")
  //   ) {
  //     return super.getNonce(blockIdentifier);
  //   }

  //   const deployment = Storage.get(this.selector);
  //   if (!deployment || !deployment.nonce) {
  //     return "0x0";
  //   }

  //   return deployment.nonce;
  // }
}

export default Account;
