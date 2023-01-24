import { CLASS_HASHES } from "@cartridge/controller/src/constants";
import {
  Abi,
  AllowArray,
  ec,
  EstimateFeeResponse,
  InvocationsDetails,
  InvokeFunctionResponse,
  typedData,
} from "starknet";
import { AccountContractDocument } from "generated/graphql";
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
  Signature,
  transaction,
  stark,
} from "starknet";
import { client } from "utils/graphql";

import selectors from "./selectors";
import Storage from "./storage";
import { NamedChainId } from "@cartridge/controller/src/constants";
import { RegisterData, VERSION } from "./controller";
import { estimateFeeBulk, getGasPrice } from "./gateway";
import WebauthnAccount, { formatAssertion } from "./webauthn";

export enum Status {
  UNKNOWN = "UNKNOWN",
  COUNTERFACTUAL = "COUNTERFACTUAL",
  DEPLOYING = "DEPLOYING",
  DEPLOYED = "DEPLOYED",
  REGISTERING = "REGISTERING",
  REGISTERED = "REGISTERED",
  PENDING_REGISTER = "PENDING_REGISTER",
}

class Account extends BaseAccount {
  private rpc: RpcProvider;
  private selector: string;
  _chainId: constants.StarknetChainId;
  updated: boolean = true;
  status: Status = Status.COUNTERFACTUAL;
  webauthn: WebauthnAccount;

  constructor(
    chainId: constants.StarknetChainId,
    nodeUrl: string,
    address: string,
    signer: SignerInterface,
    webauthn: WebauthnAccount,
  ) {
    super({ rpc: { nodeUrl } }, address, signer);
    this.rpc = new RpcProvider({ nodeUrl });
    this.selector = selectors["0.0.3"].deployment(address, chainId);
    this._chainId = chainId;
    this.webauthn = webauthn;

    const state = Storage.get(this.selector);

    if (!state || Date.now() - state.syncing > 5000) {
      this.sync();
      return;
    }

    this.status = state.status;
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

    console.log("syncing");

    try {
      if (this.status === Status.COUNTERFACTUAL) {
        const registerTxnHash = Storage.get(this.selector).registerTxnHashHash;
        if (registerTxnHash) {
          this.status = Status.REGISTERING;
          Storage.update(this.selector, {
            status: Status.REGISTERING,
          });
          this.rpc
            .waitForTransaction(registerTxnHash, 1000, [
              "ACCEPTED_ON_L1",
              "ACCEPTED_ON_L2",
            ])
            .then(() => this.sync());
          return;
        }

        const data = await this.getContract();
        if (!data?.contract?.deployTransaction?.id) {
          this.status = Status.COUNTERFACTUAL;
          Storage.update(this.selector, {
            status: Status.COUNTERFACTUAL,
          });
          // async deployed, poll for contract
          setTimeout(() => this.sync(), 5000);
          return;
        }

        const deployTxnHash = data.contract.deployTransaction.id.split("/")[1];
        const deployTxnReceipt = await this.rpc.getTransactionReceipt(
          deployTxnHash,
        );

        // Pending txn so poll for inclusion.
        if (!("status" in deployTxnReceipt)) {
          console.log("waiting for deploy txn");
          this.status = Status.DEPLOYING;
          Storage.update(this.selector, {
            status: Status.DEPLOYING,
          });
          this.rpc
            .waitForTransaction(deployTxnHash, 1000, [
              "ACCEPTED_ON_L1",
              "ACCEPTED_ON_L2",
            ])
            .then(() => this.sync());
          return;
        }

        if (deployTxnReceipt.status === "REJECTED") {
          Storage.update(this.selector, {
            status: Status.COUNTERFACTUAL,
          });
          this.status = Status.COUNTERFACTUAL;
          return;
        }
      }

      if (this.status === Status.PENDING_REGISTER) {
        return;
      }

      const classHash = await this.rpc.getClassHashAt(this.address, "pending");
      Storage.update(this.selector, {
        classHash,
        status: Status.DEPLOYED,
      });
      this.status = Status.DEPLOYED;

      if (classHash !== CLASS_HASHES["latest"].account) {
        this.updated = false;
      }

      const nonce = await this.rpc.getNonceForAddress(this.address, "pending");
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
        "pending",
      );

      if (number.toBN(res.result[1]).eq(number.toBN(1))) {
        Storage.update(this.selector, {
          status: Status.REGISTERED,
        });
        this.status = Status.REGISTERED;
      }
    } catch (e) {
      /* no-op */
      console.log(e);
    }
  }

  async execute(
    calls: AllowArray<Call>,
    abis?: Abi[],
    transactionsDetail?: InvocationsDetails,
  ): Promise<InvokeFunctionResponse> {
    if (this.status === Status.COUNTERFACTUAL) {
      throw new Error("Account is not deployed");
    }

    if (this.status === Status.PENDING_REGISTER) {
      const pendingRegister = Storage.get(
        selectors[VERSION].register(this.address, this._chainId),
      ) as RegisterData;

      const nonce = transactionsDetail.nonce
        ? transactionsDetail.nonce
        : await this.getNonce();

      const responses = await Promise.all([
        this.invokeFunction(pendingRegister.invoke.invocation, {
          ...pendingRegister.invoke.details,
          nonce: pendingRegister.invoke.details.nonce!,
        }),
        super.execute(calls, null, {
          maxFee: transactionsDetail.maxFee,
          nonce: number.toBN(nonce).add(number.toBN(1)),
          version: hash.transactionVersion,
        }),
      ]);
      Storage.remove(selectors[VERSION].register(this.address, this._chainId));

      this.status = Status.REGISTERED;
      Storage.update(this.selector, {
        status: Status.REGISTERED,
      });

      return responses[1];
    }

    return super.execute(calls, abis, transactionsDetail);
  }

  async estimateInvokeFee(
    calls: Call[],
    details: EstimateFeeDetails = {},
  ): Promise<EstimateFee> {
    details.blockIdentifier = details.blockIdentifier
      ? details.blockIdentifier
      : "pending";

    if (this.status === Status.COUNTERFACTUAL) {
      throw new Error("Account is not deployed");
    }

    const nonce = details.nonce ? details.nonce : await this.getNonce();

    if (this.status === Status.PENDING_REGISTER) {
      const pendingRegister = Storage.get(
        selectors[VERSION].register(this.address, this._chainId),
      );

      const nextNonce = number.toHex(number.toBN(nonce).add(number.toBN(1)));
      const signerDetails = {
        walletAddress: this.address,
        nonce: nextNonce,
        maxFee: constants.ZERO,
        version: hash.transactionVersion,
        chainId: this._chainId,
      };

      const signature = await this.signer.signTransaction(calls, signerDetails);

      let estimates = await estimateFeeBulk(this._chainId, [
        pendingRegister.invoke,
        {
          invocation: {
            contractAddress: this.address,
            calldata: transaction.fromCallsToExecuteCalldata(calls),
            signature,
          },
          details: {
            version: hash.transactionVersion,
            nonce: nextNonce,
            maxFee: constants.ZERO,
          },
        },
      ]);

      if (estimates.code) {
        throw new Error(estimates.message);
      }

      const estimates2 = estimates as EstimateFeeResponse[];
      const fees = estimates2.reduce<EstimateFee>(
        (prev, estimate) => {
          const overall_fee = prev.overall_fee.add(
            number.toBN(estimate.overall_fee),
          );
          return {
            overall_fee: overall_fee,
            gas_consumed: prev.gas_consumed.add(
              number.toBN(estimate.gas_consumed),
            ),
            gas_price: prev.gas_price.add(number.toBN(estimate.gas_price)),
            suggestedMaxFee: overall_fee,
          };
        },
        {
          overall_fee: number.toBN(0),
          gas_consumed: number.toBN(0),
          gas_price: number.toBN(0),
          suggestedMaxFee: number.toBN(0),
        },
      );

      fees.suggestedMaxFee = stark.estimatedFeeToMaxFee(fees.overall_fee);

      return fees;
    }

    return super.estimateInvokeFee(calls, details);
  }

  async verifyMessageHash(
    hash: string | number | import("bn.js"),
    signature: Signature,
  ): Promise<boolean> {
    if (number.toBN(signature[0]).cmp(number.toBN(0)) === 0) {
      const keyPair = ec.getKeyPairFromPublicKey(signature[0]);
      return ec.verify(keyPair, number.toBN(hash).toString(), signature);
    }

    super.verifyMessageHash(hash, signature);
  }

  async signMessage(typedData: typedData.TypedData): Promise<Signature> {
    return await (this.status === Status.REGISTERED ||
    this.status === Status.COUNTERFACTUAL
      ? super.signMessage(typedData)
      : this.webauthn.signMessage(typedData));
  }

  async register(): Promise<RegisterData> {
    const pubKey = await this.signer.getPubKey();
    const calls: Call[] = [
      {
        contractAddress: this.address,
        entrypoint: "executeOnPlugin",
        calldata: [
          CLASS_HASHES["0.0.1"].controller,
          hash.getSelector("add_device_key"),
          1,
          pubKey,
        ],
      },
    ];

    const nonce = await this.getNonce();
    const version = number.toBN(hash.transactionVersion);
    const calldata = transaction.fromCallsToExecuteCalldata(calls);

    const gas = 28000;
    const gasPrice = await getGasPrice(this._chainId);
    const fee = number.toBN(gasPrice).mul(number.toBN(gas));
    const suggestedMaxFee = number.toHex(stark.estimatedFeeToMaxFee(fee));

    let msgHash = hash.calculateTransactionHash(
      this.address,
      version,
      calldata,
      suggestedMaxFee,
      this._chainId,
      nonce,
    );

    let challenge = Uint8Array.from(
      msgHash
        .slice(2)
        .padStart(64, "0")
        .slice(0, 64)
        .match(/.{1,2}/g)
        .map((byte) => parseInt(byte, 16)),
    );
    const assertion = await this.webauthn.signer.sign(challenge);
    const signature = formatAssertion(assertion);

    const invoke = {
      invocation: { contractAddress: this.address, calldata, signature },
      details: {
        nonce,
        maxFee: suggestedMaxFee,
        version,
      },
    };

    Storage.set(selectors[VERSION].register(this.address, this._chainId), {
      assertion,
      invoke,
    });

    this.status = Status.PENDING_REGISTER;
    Storage.update(this.selector, {
      status: Status.PENDING_REGISTER,
    });

    return {
      assertion,
      invoke,
    };
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
