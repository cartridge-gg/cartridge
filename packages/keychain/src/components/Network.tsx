import { StarknetIcon } from "@cartridge/ui";
import { HStack, Text } from "@chakra-ui/react";
import { constants } from "starknet";

const Network = ({ chainId }: { chainId: constants.StarknetChainId }) => {
  return (
    <HStack
      h="24px"
      p="0 12px"
      borderRadius="12px"
      backgroundColor="whiteAlpha.200"
    >
      <StarknetIcon h="9px" w="9px" color="white" />
      <Text fontSize="10px" fontWeight="bold" letterSpacing="0.08em">
        {chainId === constants.StarknetChainId.MAINNET ? "MAINNET" : "TESTNET"}
      </Text>
    </HStack>
  );
};

export default Network;
