import { useCallback, useState } from "react";
import { VStack, HStack, Text, Spacer } from "@chakra-ui/react";
import Container from "./legacy/Container";
import { Header } from "./Header";
import Session from "components/Session";
import { Banner } from "components/Banner";
import { constants } from "starknet";
import { Error, Policy, ResponseCodes } from "@cartridge/controller";
import { MysteryIcon } from "@cartridge/ui/lib";

const Connect = ({
  chainId,
  policys,
  origin,
  onConnect,
  onCancel,
  onLogout,
}: {
  chainId: constants.StarknetChainId;
  policys: Policy[];
  origin: string;
  onConnect: ({
    policies,
    maxFee,
  }: {
    policies: Policy[];
    maxFee: string;
  }) => void;
  onCancel: (error: Error) => void;
  onLogout: () => void;
}) => {
  const [maxFee, setMaxFee] = useState(null);

  const connect = useCallback(
    async (values, actions) => {
      try {
        const approvals = policys.filter((_, i) => values[i]);
        onConnect({ policies: approvals, maxFee });
      } catch (e) {
        console.error(e);
      }
      actions.setSubmitting(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [origin, onConnect, policys, maxFee],
  );

  return (
    <Container>
      <Header
        chainId={chainId}
        onClose={() =>
          onCancel({
            code: ResponseCodes.CANCELED,
            message: "Cancelled",
          })
        }
        onLogout={onLogout}
      />
      <Banner
        title="Create Session"
        description={`${origin} is requesting to connect to your Cartridge Controller`}
        // TODO: icon
        // icon={<PlugIcon boxSize="30px" />}
        icon={<MysteryIcon boxSize="30px" />}
        chainId={chainId}
        py="20px"
      />
      {false && (
        <VStack w="full" overflow="hidden" borderRadius="6px" spacing="1px">
          <VStack bgColor="gray.700" w="full" p="12px" align="flex-start">
            <Text variant="ibm-upper-bold" fontSize="10px" color="gray.200">
              Register Session
            </Text>
            <Text fontSize="11px" color="gray.200">
              Authorize your controller to perform actions from this
              application.
            </Text>
          </VStack>
          <HStack bgColor="gray.600" py="7px" px="12px" w="full">
            {/* TODO: icon <LaptopIcon boxSize="18px" /> */}
            <MysteryIcon boxSize="18px" />
            <Text fontSize="13px">Register Session</Text>
            <Spacer />
          </HStack>
        </VStack>
      )}
      <Session
        chainId={chainId}
        action={"CREATE"}
        onCancel={() => {
          onCancel({ code: ResponseCodes.CANCELED, message: "Canceled" });
        }}
        onSubmit={connect}
        policies={policys}
        invalidPolicys={[]}
        isLoading={false}
        maxFee={maxFee}
        setMaxFee={setMaxFee}
      />
    </Container>
  );
};

export default Connect;
