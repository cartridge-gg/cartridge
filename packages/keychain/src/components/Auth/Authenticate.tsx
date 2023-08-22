import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, UseDisclosureProps } from "@chakra-ui/react";
import { Unsupported } from "./Unsupported";
import { Credentials, onCreateBegin, onCreateFinalize } from "hooks/account";
import { SimpleModal } from "@cartridge/ui/src/components/modals/SimpleModal";
import { useStartup } from "hooks/startup";
import {
  FaceIDDuoIcon,
  FingerprintDuoIcon,
  NewControllerDuoIcon,
  QRCodeDuoIcon,
} from "@cartridge/ui";
import { Container } from "../Container";
import { PortalBanner } from "components/PortalBanner";
import { PortalFooter } from "components/PortalFooter";

export function Authenticate({
  name,
  pubkey,
  isModal = false,
  isOpen,
  onComplete,
  onClose,
}: {
  name: string;
  pubkey: string;
  isModal?: boolean;
  onComplete: () => void;
} & UseDisclosureProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userAgent, setUserAgent] = useState<UserAgent>("other");
  const [unsupportedMessage, setUnsupportedMessage] = useState<string>();

  const { play, StartupAnimation } = useStartup({ onComplete });

  const onAuth = useCallback(async () => {
    // https://webkit.org/blog/11545/updates-to-the-storage-access-api/
    document.cookie = "visited=true; path=/;";

    setIsLoading(true);
    try {
      const credentials: Credentials = await onCreateBegin(
        decodeURIComponent(name),
      );
      await onCreateFinalize(pubkey, credentials);

      play();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      throw e;
    }
  }, [play, name, pubkey]);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      const iosVersion = /OS (\d+)_?(?:\d+_?){0,2}\s/.exec(userAgent);
      if (iosVersion && Number(iosVersion[1]) < 16) {
        setUnsupportedMessage(
          `iOS ${iosVersion[1]} does not support passkeys. Upgrade to iOS 16 to continue`,
        );
      }
      setUserAgent("ios");
    } else if (/android/i.test(userAgent)) {
      setUserAgent("android");
    }
  }, []);

  if (unsupportedMessage) {
    return <Unsupported message={unsupportedMessage} />;
  }

  return (
    <>
      {isModal ? (
        <SimpleModal
          icon={<NewControllerDuoIcon boxSize={10} />}
          onClose={onClose}
          onConfirm={() => {
            onAuth().then(() => onClose());
          }}
          confirmText="Continue"
          isOpen={isOpen}
          showCloseButton={false}
          isLoading={isLoading}
          dismissable={false}
        >
          <Content userAgent={userAgent} />
        </SimpleModal>
      ) : (
        <Container fullPage>
          <Content userAgent={userAgent} />
          <PortalFooter fullPage>
            <Button
              colorScheme="colorful"
              onClick={onAuth}
              isLoading={isLoading}
            >
              continue
            </Button>
          </PortalFooter>
        </Container>
      )}

      {StartupAnimation}
    </>
  );
}

type UserAgent = "ios" | "android" | "other";

function Content({ userAgent }: { userAgent: UserAgent }) {
  const Icon = useMemo(() => {
    switch (userAgent) {
      case "ios":
        return FaceIDDuoIcon;
      case "android":
        return QRCodeDuoIcon;
      case "other":
        return FingerprintDuoIcon;
    }
  }, [userAgent]);

  return (
    <PortalBanner
      Icon={Icon}
      title="Authenticate Yourself"
      description={
        <>
          You will now be asked to authenticate yourself.
          <br />
          Note: this experience varies from browser to browser.
        </>
      }
    />
  );
}
