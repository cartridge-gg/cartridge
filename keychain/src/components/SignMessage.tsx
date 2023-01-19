import React, { useEffect, useState } from "react";
import { Box, Flex, Spacer, Text, Image } from "@chakra-ui/react";

import {
  typedData as td,
  shortString,
  constants,
  number,
  Signature,
  hash,
} from "starknet";

import { Banner } from "components/Banner";
import ButtonBar from "components/ButtonBar";
import Details from "components/Details";
import Controller from "utils/controller";

const DetailsHeader = (data: {
  media?: Array<{ uri: string }>;
  name: string;
}) => {
  return (
    <Box>
      <Flex justify="center" alignItems="center">
        {data.media && (
          <Image
            borderRadius="full"
            boxSize="20px"
            src={data.media[0].uri}
            mr="8px"
            alt="Details Header"
          />
        )}
        <strong>{data.name}</strong>
      </Flex>
      <Box mt="3" textColor="#808080">
        <strong>{data.name}</strong> is asking you to sign the following
        message:
      </Box>
    </Box>
  );
};

const DetailsTransaction = (items: Object) => {
  const entry = (key: string, value: any) => {
    return (
      <Box key={key}>
        <Text fontFamily="LD_Mono" fontWeight="bold" textColor="#7A857A" my="1">
          {key}
        </Text>
        <Text>{value}</Text>
      </Box>
    );
  };

  let entries: Array<React.ReactNode> = [];
  for (let key in items) {
    entries.push(entry(key, items[key]));
  }

  return (
    <Box borderLeft="solid thick #1E221F">
      <Box mx="4">{entries}</Box>
    </Box>
  );
};

const MessageContent = (message: object) => {
  return (
    <Box>
      <strong>
        <Text as="pre" mb="4" whiteSpace="pre-wrap" wordBreak="break-all">
          {message ? JSON.stringify(message, null, 2) : ""}
        </Text>
      </strong>
      <Text mb="4" textColor="#808080">
        This request will not create a blockchain transaction or cost any gas
        fees.
      </Text>
    </Box>
  );
};

const SignMessage = ({
  controller,
  origin,
  typedData,
  onSign,
  onCancel,
}: {
  controller: Controller;
  origin: string;
  typedData: td.TypedData;
  onSign: (sig: Signature) => void;
  onCancel: (reason?: string) => void;
}) => {
  const [messageData, setMessageData] = useState({});

  const headerData = { icon: <></>, name: origin as string };

  useEffect(() => {
    if (!typedData) return;
    const primaryTypeData = typedData.types[typedData.primaryType];

    // Recursively decodes all nested `felt*` types
    // to their ASCII equivalents
    const convertFeltArraysToString = (
      initial: object,
      messageType: Array<{ name: string; type: string }>,
    ) => {
      for (const typeMember of messageType) {
        if (typeMember.type === "felt*") {
          const stringArray: Array<string> = initial[typeMember.name].map(
            (hex: string) => shortString.decodeShortString(hex),
          );
          initial[typeMember.name] = stringArray.join("");
        } else if (typeMember.type !== "felt" && typeMember.type !== "string") {
          convertFeltArraysToString(
            initial[typeMember.name],
            typedData.types[typeMember.type],
          );
        }
      }
    };

    convertFeltArraysToString(typedData.message, primaryTypeData);
    setMessageData(typedData);
  }, [typedData]);

  if (!typedData.domain.chainId) {
    onCancel("Chain ID not specified in typed data domain");
    return <></>;
  }

  if (!controller) {
    return <></>;
  }

  return (
    <Flex flexDirection="column" p={["3.5", "6"]} flex="1">
      <Banner title="Signature Request"></Banner>
      <Details header={DetailsHeader(headerData)}>
        {MessageContent(messageData)}
      </Details>
      <Spacer />
      <ButtonBar
        onSubmit={async () => {
          const sig = await controller
            .account(parseChainId(typedData.domain.chainId))
            .signMessage(typedData);
          onSign(sig);
        }}
        onCancel={onCancel}
        isSubmitting={false}
      >
        <Box mr="3">SIGN</Box>
      </ButtonBar>
    </Flex>
  );
};

function parseChainId(chainId: string | number) {
  if (typeof chainId === "number") {
    return constants.StarknetChainId[chainId.toString(16)];
  } else if (typeof chainId === "string") {
    if (chainId.startsWith("0x")) {
      return constants.StarknetChainId[chainId];
    } else {
      return constants.StarknetChainId[shortString.encodeShortString(chainId)];
    }
  }
}

export default SignMessage;
