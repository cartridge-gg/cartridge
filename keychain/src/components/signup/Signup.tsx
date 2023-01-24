import { useEffect, useState, useCallback } from "react";
import { Formik, Form, Field, FormikState } from "formik";
import { css } from "@emotion/react";
import {
  Button,
  Input,
  InputProps,
  Tooltip,
  Circle,
  VStack,
  HStack,
  Text,
  Link,
  InputGroup,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  InputRightElement,
} from "@chakra-ui/react";
import {
  BeginRegistrationDocument,
  DeployAccountDocument,
  FinalizeRegistrationDocument,
  useAccountQuery,
} from "generated/graphql";
import { useDebounce } from "hooks/debounce";
import { constants, ec, KeyPair } from "starknet";
import { PopupCenter } from "utils/url";

import InfoIcon from "@cartridge/ui/src/components/icons/Info";
import ReturnIcon from "@cartridge/ui/src/components/icons/Return";
import JoystickIcon from "@cartridge/ui/components/icons/Joystick";
import LockIcon from "@cartridge/ui/components/icons/Lock";
import { Logo } from "@cartridge/ui/components/icons/brand/Logo";
import Fingerprint from "components/icons/Fingerprint";
import Web3Auth from "components/Web3Auth";
import Continue from "components/signup/Continue";
import { client } from "utils/graphql";
import Controller from "utils/controller";
import Content from "../Content";
import { Status } from "utils/account";

export const Signup = ({
  showLogin,
  onSignup,
}: {
  showLogin: () => void;
  onSignup: (controller: Controller) => void;
}) => {
  const [name, setName] = useState("");
  const [keypair, setKeypair] = useState<KeyPair>();
  const [nameError, setNameError] = useState("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [canContinue, setCanContinue] = useState(false);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { debouncedValue: debouncedName } = useDebounce(name, 1500);
  const {
    error,
    refetch,
    isFetching,
    data: accountData,
  } = useAccountQuery(
    { id: debouncedName },
    {
      enabled: isRegistering,
      retry: isRegistering,
      refetchInterval: 1000,
    },
  );

  useEffect(() => {
    if (debouncedName.length === 0) {
      return;
    }
    refetch();
  }, [refetch, debouncedName]);

  useEffect(() => {
    if (isRegistering || isFetching) {
      return;
    }

    if (error) {
      if ((error as Error).message === "ent: account not found") {
        setNameError("");
        setCanContinue(true);
        if (!dismissed) {
          onOpen();
        }
      } else {
        setNameError("An error occured.");
        setCanContinue(false);
      }
    } else if (debouncedName.length > 0) {
      setNameError("This account already exists.");
      setCanContinue(false);
    }
  }, [debouncedName, isFetching, error, dismissed, isRegistering, onOpen]);

  useEffect(() => {
    if (accountData && isRegistering) {
      const {
        account: {
          credential: { id: credentialId },
          contractAddress: address,
        },
      } = accountData;

      const controller = new Controller(keypair, address, credentialId);
      onSignup(controller);

      controller.account(constants.StarknetChainId.TESTNET).status = Status.DEPLOYING;
      client.request(DeployAccountDocument, {
        id: debouncedName,
        chainId: "starknet:SN_GOERLI",
      }).then(() => {
        controller.account(constants.StarknetChainId.TESTNET).sync();
      })
    }
  }, [
    accountData,
    isRegistering,
    debouncedName,
    keypair,
    onSignup,
  ]);

  const onContinue = useCallback(async () => {
    const keypair = ec.genKeyPair();
    const deviceKey = ec.getStarkKey(keypair);

    setKeypair(keypair);
    setIsRegistering(true);

    PopupCenter(
      `/authenticate?name=${encodeURIComponent(
        debouncedName,
      )}&pubkey=${encodeURIComponent(deviceKey)}`,
      "Cartridge Signup",
      480,
      640,
    );
  }, [debouncedName]);

  if (isRegistering) {
    return <Continue />;
  }

  return (
    <Content gap="18px">
      <HStack spacing="14px" pt="36px">
        <Circle size="48px" bgColor="gray.700">
          <JoystickIcon boxSize="30px" />
        </Circle>
        <Ellipses />
        <Circle size="48px" bgColor="gray.700">
          <Logo boxSize="22px" color="brand" />
        </Circle>
      </HStack>
      <Text fontWeight="bold" fontSize="17px">
        Create your Controller
      </Text>
      <Text
        fontSize="12px"
        mt="-8px !important"
        color="whiteAlpha.600"
        textAlign="center"
      >
        Your Controller will be used for interacting with the game.
      </Text>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={() => {
          if (canContinue) {
            onOpen();
          }
        }}
      >
        {(props) => (
          <Form
            css={css`
              display: flex;
              flex-direction: column;
              flex: 1;
              width: 100%;
              margin-top: 0px !important;
              gap: 24px;
            `}
            spellCheck={false}
          >
            <Field name="name">
              {({
                field,
              }: {
                field: InputProps;
                form: FormikState<{ name: string }>;
              }) => (
                <Tooltip
                  variant="error"
                  mt="10px"
                  placement="top"
                  isOpen={!!nameError && !isFetching}
                  hasArrow
                  label={
                    <>
                      <InfoIcon fill="whiteAlpha.600" mr="5px" />
                      {nameError}
                    </>
                  }
                >
                  <InputGroup>
                    <Input
                      {...field}
                      h="42px"
                      onChange={(e) => {
                        setName(e.target.value);
                        setCanContinue(false);
                        setNameError("");
                        props.handleChange(e);
                      }}
                      isInvalid
                      borderColor={
                        canContinue
                          ? "green.400"
                          : nameError
                            ? "red.400"
                            : "gray.600"
                      }
                      errorBorderColor="crimson"
                      placeholder="Username"
                      autoComplete="off"
                      onBlur={() => {
                        if (canContinue) {
                          onOpen();
                        }
                      }}
                    />
                    {canContinue && (
                      <InputRightElement
                        h="full"
                        mr="5px"
                        cursor="pointer"
                        onClick={() => {
                          if (canContinue) {
                            onOpen();
                          }
                        }}
                      >
                        <ReturnIcon boxSize="20px" fill="green.400" />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </Tooltip>
              )}
            </Field>

            <HStack justify="center">
              <Text fontSize="12px" color="whiteAlpha.600" fontWeight="bold">
                Already have a controller?
              </Text>
              <Link variant="outline" fontSize="11px" onClick={showLogin}>
                Log In
              </Link>
            </HStack>
            <Drawer
              placement="bottom"
              onClose={() => {
                setDismissed(true);
                onClose();
              }}
              isOpen={isOpen}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody p="36px">
                  <VStack gap="24px">
                    <HStack>
                      <LockIcon />
                      <Text fontSize="12px" color="whiteAlpha.600">
                        By continuing you are agreeing to Cartridge&apos;s Terms
                        of Service and Privacy Policy
                      </Text>
                    </HStack>
                    <VStack w="full" gap="12px">
                      <Button w="full" gap="10px" onClick={() => onContinue()}>
                        <Fingerprint
                          height="16px"
                          width="16px"
                          css={css`
                            > path {
                              fill: black;
                            }
                          `}
                        />
                        Continue
                      </Button>
                      <Web3Auth
                        username={debouncedName}
                        onAuth={async (controller) => {
                          await client.request(BeginRegistrationDocument, {
                            id: debouncedName,
                          });
                          await client.request(FinalizeRegistrationDocument, {
                            credentials: "discord",
                            signer: controller.publicKey,
                          });
                          onSignup(controller);
                          controller.account(constants.StarknetChainId.TESTNET).status = Status.DEPLOYING;
                          client.request(DeployAccountDocument, {
                            id: debouncedName,
                            chainId: "starknet:SN_GOERLI",
                          }).then(() => {
                            controller.account(constants.StarknetChainId.TESTNET).sync();
                          })
                        }}
                      />
                    </VStack>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Form>
        )}
      </Formik>
    </Content>
  );
};

const Ellipses = () => {
  return (
    <HStack spacing="3px">
      <Circle size="4px" bgColor="gray.400" />
      <Circle size="4px" bgColor="gray.400" />
      <Circle size="4px" bgColor="gray.400" />
    </HStack>
  );
};
