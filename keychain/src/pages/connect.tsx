import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

import Session from "components/Session";
import { Header } from "components/Header";
import { useRequests } from "hooks/account";
import { useUrlPolicys } from "hooks/policy";
import Controller from "utils/account";

const Connect: NextPage = () => {
  const [maxFee, setMaxFee] = useState(null);
  const { validPolicys, invalidPolicys, isValidating } = useUrlPolicys();
  const { origin } = useRequests();
  const controller = useMemo(() => Controller.fromStore(), []);
  const router = useRouter();

  useEffect(() => {
    if (!controller) {
      router.replace({
        pathname: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        query: `redirect=${encodeURIComponent(window.location.href)}`,
      });
      return;
    }
  }, [router, controller]);

  const approve = useCallback(
    async (values, actions) => {
      try {
        const approvals = validPolicys.filter((_, i) => values[i]);
        controller.approve(origin, approvals, maxFee);
        if (window.opener) {
          window.close();
        }
      } catch (e) {
        console.error(e);
      }
      actions.setSubmitting(false);
    },
    [origin, validPolicys, controller, maxFee],
  );

  if (!controller) {
    return <></>;
  }

  return (
    <>
      <Header address={controller.address} />
      <Flex height="calc(100vh - 70px)">
        <Session
          action={
            "CONFIRM" +
            (validPolicys.length > 0 ? ` [${validPolicys.length + 1}]` : "")
          }
          title="SESSION DETAILS"
          message={
            <>
              <strong>{origin}</strong>
              {validPolicys.length > 0
                ? " is requesting permission to submit transactions on your behalf"
                : " is requesting to connect to your account"}
            </>
          }
          onCancel={() => {
            if (window.opener) {
              window.close();
            }
          }}
          onSubmit={approve}
          policies={validPolicys}
          invalidPolicys={invalidPolicys}
          isLoading={isValidating}
          maxFee={maxFee}
          setMaxFee={setMaxFee}
        />
      </Flex>
    </>
  );
};

export default dynamic(() => Promise.resolve(Connect), { ssr: false });
