import {
  Container as ChakraContainer,
  VStack,
  StyleProps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Header, HeaderProps } from "./Header/v2";

export default function Container({
  children,
  ...rest
}: { children: ReactNode } & StyleProps) {
  return (
    <ChakraContainer
      overflowY="auto"
      css={{
        "::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
      }}
      p="36px"
      w={["full", "full", "432px"]}
      h="full"
      position="fixed"
      as={motion.div}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      centerContent
      {...rest}
    >
      {children}
    </ChakraContainer>
  );
}

export function ContainerV2({
  children,
  fullPage,
  chainId,
  address,
  ...rest
}: { children: ReactNode; fullPage: boolean } & StyleProps & HeaderProps) {
  return (
    <ChakraContainer
      position={fullPage ? "relative" : "fixed"}
      w={["full", "full", "432px"]}
      h="full"
      as={motion.div}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      centerContent
      p={0}
      {...rest}
    >
      <Header chainId={chainId} address={address} />
      <VStack
        w="full"
        h="full"
        p={4}
        overflowY="scroll"
        css={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
        }}
      >
        {children}
      </VStack>
    </ChakraContainer>
  );
}
