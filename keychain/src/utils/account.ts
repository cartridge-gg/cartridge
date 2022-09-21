import {
    ec,
    Account,
    defaultProvider,
    KeyPair,
    number,
} from "starknet";
import { BigNumberish } from "starknet/utils/number";
import { Scope, Approvals } from "@cartridge/controller";
import equal from "fast-deep-equal";

import Storage from "utils/storage";
import { DeviceSigner } from "./signer";

export default class Controller extends Account {
    public accountId: string;
    protected publicKey: string;
    protected keypair: KeyPair;

    constructor(
        accountId: string,
        keypair: KeyPair,
        address: string,
    ) {
        super(defaultProvider, address, keypair);
        this.signer = new DeviceSigner(keypair);
        this.accountId = accountId;
        this.keypair = keypair;
        this.publicKey = ec.getStarkKey(keypair);
    }

    cache() {
        return Storage.set("controller", {
            accountId: this.accountId,
            privateKey: number.toHex(this.keypair.priv),
            publicKey: this.publicKey,
            address: this.address,
        });
    }

    async approve(origin: string, scopes: Scope[], maxFee?: BigNumberish) {
        const value: Approvals = {
            [origin]: {
                scopes,
                maxFee,
            },
        };
        const raw = Storage.get("approvals");
        if (raw) {
            value[origin] = { scopes, maxFee };
        }

        Storage.set("approvals", value);
    }

    async unapprove(origin: string) {
        const approvals = Storage.get("approvals");
        delete approvals[origin];

        Storage.set("approvals", approvals);
    }

    async approval(
        origin: string,
    ): Promise<{ scopes: Scope[]; maxFee: BigNumberish } | undefined> {
        const approvals = await this.approvals();
        if (!approvals) {
            return;
        }

        const url = new URL(origin);
        return approvals[url.href];
    }

    async approvals(): Promise<Approvals | undefined> {
        const raw = Storage.get("approvals");
        if (!raw) {
            return;
        }
        return raw as Approvals;
    }

    static fromStore() {
        const controller = Storage.get("controller");
        if (!controller) {
            return null;
        }

        const { accountId, privateKey, address } = controller;
        const keypair = ec.getKeyPair(privateKey);
        return new Controller(accountId, keypair, address);
    }
}

export function diff(a: Scope[], b: Scope[]): Scope[] {
    return a.reduce(
        (prev, scope) =>
            b.some((approval) => equal(approval, scope)) ? prev : [...prev, scope],
        [] as Scope[],
    );
}
