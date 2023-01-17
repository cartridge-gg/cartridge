import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";

import { connectToParent } from "@cartridge/penpal";

import Controller, { diff, VERSION } from "utils/controller";
import { normalize as normalizeOrigin } from "utils/url";
import { Policy, Session } from "@cartridge/controller";
import Connect from "components/Connect";
import { Login } from "components/Login";
import { Box, Container as ChakraContainer } from "@chakra-ui/react";
import { Header } from "components/Header";
import {
  Abi,
  Call,
  constants,
  InvocationsDetails,
  InvokeFunctionResponse,
  number,
  Signature,
  typedData,
} from "starknet";
import SignMessage from "components/SignMessage";
import Execute from "components/Execute";
import selectors from "utils/selectors";
import Storage from "utils/storage";
import { useInterval } from "usehooks-ts";

import { estimateDeclareFee, estimateInvokeFee } from "../methods/estimate";
import provision from "../methods/provision";
import { register } from "../methods/register";
import login from "../methods/login";
import logout from "../methods/logout";
import { revoke, session, sessions } from "../methods/sessions";

export function normalize<T = Function>(
  fn: (origin: string) => T,
): (origin: string) => T {
  return (origin: string) => fn(normalizeOrigin(origin));
}

export function validate<T = Function>(
  fn: (controller: Controller, session: Session, origin: string) => T,
): (origin: string) => T {
  return (origin: string) => {
    const controller = Controller.fromStore();
    if (!controller) {
      throw new Error("no controller");
    }

    const session = controller.session(origin);
    if (!session) {
      throw new Error("not connected");
    }

    return fn(controller, session, origin);
  };
}

const Container = ({ children }: { children: ReactNode }) => (
  <ChakraContainer
    display="flex"
    alignItems="center"
    justifyContent="center"
    position="fixed"
    left={0}
    right={0}
    top={0}
    bottom={0}
  >
    <Header />
    <Box position="fixed" left={0} right={0} bottom={0} top="50px">
      {children}
    </Box>
  </ChakraContainer>
);

type Context = Connect | Execute | SignMessage;

type Connect = {
  origin: string;
  type: "connect";
  policies: Policy[];
  resolve: ({
    address,
    policies,
  }: {
    address: string;
    policies: Policy[];
  }) => void;
  reject: (reason?: unknown) => void;
};

type Execute = {
  origin: string;
  type: "execute";
  transactions: Call | Call[];
  abis?: Abi[];
  transactionsDetail?: InvocationsDetails & {
    chainId?: constants.StarknetChainId;
  };
  resolve: ({
    res,
    needSync,
  }: {
    res?: InvokeFunctionResponse;
    needSync?: boolean;
  }) => void;
  reject: (reason?: unknown) => void;
};

type SignMessage = {
  origin: string;
  type: "sign-message";
  typedData: typedData.TypedData;
  account: string;
  resolve: (signature: Signature) => void;
  reject: (reason?: unknown) => void;
};

const Index: NextPage = () => {
  const [chainId, setChainId] = useState<constants.StarknetChainId>(
    constants.StarknetChainId.TESTNET,
  );
  const [context, setContext] = useState<Context>();
  const [controller, setController] = useState<Controller>();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.self === window.top) {
      return;
    }

    const connection = connectToParent({
      methods: {
        connect: normalize((origin: string) => async (policies: Policy[]) => {
          return await new Promise((resolve, reject) => {
            setContext({
              type: "connect",
              origin,
              policies,
              resolve,
              reject,
            } as Connect);
          });
        }),
        disconnect: normalize(
          validate(
            (controller: Controller, _session: Session, origin: string) => () =>
              controller.revoke(origin),
          ),
        ),
        execute: normalize(
          validate(
            (controller: Controller, session: Session, origin: string) =>
              async (
                transactions: Call | Call[],
                abis?: Abi[],
                transactionsDetail?: InvocationsDetails & {
                  chainId?: constants.StarknetChainId;
                },
                sync?: boolean,
              ) => {
                const cId = transactionsDetail?.chainId
                  ? transactionsDetail.chainId
                  : chainId;
                if (sync) {
                  return await new Promise((resolve, reject) => {
                    setContext({
                      type: "execute",
                      origin,
                      transactions,
                      abis,
                      transactionsDetail,
                      resolve,
                      reject,
                    } as Execute);
                  });
                }

                const account = controller.account(cId);
                if (!account.registered || !account.deployed) {
                  return Promise.resolve({ needSync: true });
                }

                const calls = Array.isArray(transactions)
                  ? transactions
                  : [transactions];
                const policies = calls.map(
                  (txn) =>
                    ({
                      target: txn.contractAddress,
                      method: txn.entrypoint,
                    } as Policy),
                );

                const missing = diff(policies, session.policies);
                if (missing.length > 0) {
                  return Promise.resolve({ needSync: true });
                }

                if (!transactionsDetail.maxFee) {
                  transactionsDetail.maxFee = (
                    await account.estimateInvokeFee(calls, {
                      nonce: transactionsDetail.nonce,
                    })
                  ).suggestedMaxFee;
                }

                if (
                  session.maxFee &&
                  transactionsDetail &&
                  number
                    .toBN(transactionsDetail.maxFee)
                    .gt(number.toBN(session.maxFee))
                ) {
                  return Promise.resolve({ needSync: true });
                }

                return account.execute(calls, abis, transactionsDetail);
              },
          ),
        ),
        estimateDeclareFee: normalize(validate(estimateDeclareFee)),
        estimateInvokeFee: normalize(validate(estimateInvokeFee)),
        provision: normalize(provision),
        register: normalize(register),
        login: normalize(login),
        logout: normalize(logout),
        probe: normalize(
          validate((controller: Controller, session: Session) => () => ({
            address: controller.address,
            policies: session.policies,
          })),
        ),
        revoke: normalize(revoke),
        signMessage: normalize(
          validate(
            (controller: Controller, session: Session) =>
              async (typedData: typedData.TypedData, account: string) => {
                return await new Promise((resolve, reject) => {
                  setContext({
                    type: "sign-message",
                    origin,
                    typedData,
                    account,
                    resolve,
                    reject,
                  } as SignMessage);
                });
              },
          ),
        ),
        session: normalize(session),
        sessions: normalize(sessions),
      },
    });

    return () => {
      connection.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setContext]);

  useInterval(
    () => {
      const controller = Controller.fromStore();
      setController(controller);
    },
    controller ? null : 500,
  );

  if (window.self === window.top) {
    return <></>;
  }

  if (!context?.origin) {
    return <></>;
  }

  // No controller, send to login
  if (!controller) {
    return (
      <Container>
        <Login
          chainId={chainId}
          onLogin={() => {}}
          onCancel={() => context.reject()}
        />
      </Container>
    );
  }

  const sesh = controller.session(context.origin);
  if (context.type === "connect" || !sesh) {
    const ctx = context as Connect;
    return (
      <Container>
        <Connect
          chainId={chainId}
          controller={controller}
          origin={ctx.origin}
          policys={ctx.type === "connect" ? (ctx as Connect).policies : []}
          onConnect={async ({
            address,
            policies,
          }: {
            address: string;
            policies: Policy[];
          }) => {
            const pendingRegister = Storage.get(
              selectors[VERSION].register(controller.address, chainId),
            );
            if (!controller.account(chainId).registered && !pendingRegister) {
              const { assertion, invoke } = await controller.signAddDeviceKey(
                chainId,
              );
              Storage.set(
                selectors[VERSION].register(controller.address, chainId),
                { assertion, invoke },
              );
            }

            ctx.resolve({ address, policies });
          }}
          onCancel={() => ctx.reject()}
        />
      </Container>
    );
  }

  if (!controller) {
    return <></>;
  }

  if (context.type === "sign-message") {
    const ctx = context as SignMessage;
    return (
      <Container>
        <SignMessage
          controller={controller}
          origin={ctx.origin}
          typedData={ctx.typedData}
          onSign={(sig) => context.resolve(sig)}
          onCancel={(reason?: string) => context.reject(reason)}
        />
      </Container>
    );
  }

  if (context.type === "execute") {
    const ctx = context as Execute;
    const account = controller.account(chainId);

    if (!account.deployed) {
      return <div>Deploy</div>;
    } else if (!account.registered) {
      return <div>Register</div>;
    }

    return (
      <Container>
        <Execute controller={controller} {...ctx} />
      </Container>
    );
  }

  return <Container>Here</Container>;
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
