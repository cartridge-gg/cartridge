import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, PortalBanner } from "components";
import { SparklesDuoIcon } from "@cartridge/ui/lib";

const Consent: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // 1. Retrieve slot local server address from state param
    const val = Array.isArray(router.query.state)
      ? router.query.state[0]
      : router.query.state;
    const url = decodeURIComponent(val);

    // 2. Post authorization code to the local server
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).catch((e) => console.error("Failed to send callback request to slot"));

    // 3. (Optional) Redirect to the documentation page if available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <PortalBanner
        Icon={SparklesDuoIcon}
        title="Success!"
        description="Return to your terminal to continue"
      />
    </Container>
  );
};

export default Consent;
