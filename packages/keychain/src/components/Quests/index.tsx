import { Container } from "../Container";
import { useEffect, useState } from "react";
import { useAccountInfoQuery, useAccountQuestsQuery } from "generated/graphql";
import { constants } from "starknet";
import { QuestOverview } from "./Overview";
import { QuestDetails } from "./Details";
import { Flex, Text, useToast } from "@chakra-ui/react";

export function Quests({
  gameId,
  address,
  chainId,
  onLogout,
}: {
  gameId: string;
  address: string;
  chainId: constants.StarknetChainId;
  onLogout: () => void;
}) {
  const toast = useToast();
  const [selectedQuestId, setSelectedQuestId] = useState<string>();
  const [questsWithProgression, setQuestsWithProgression] =
    useState<Array<{ quest: any; progress: any }>>();
  const { data: accountData } = useAccountInfoQuery({ address });
  const accountId = accountData?.accounts?.edges[0]?.node.id;
  const { data: questData, refetch: refetchQuests } = useAccountQuestsQuery(
    { accountId, gameId },
    {
      enabled: !!accountId,
    },
  );
  const questProgression = questData?.account?.questProgression?.edges;
  const quests = questData?.quests?.edges;

  useEffect(() => {
    const qwp: Array<{ quest: any; progress: any }> = [];
    quests?.forEach(({ node: q }) => {
      const progress = questProgression?.find(
        ({ node: qp }) => qp.questID === q.id,
      );
      qwp.push({
        quest: q,
        progress: progress?.node ?? null,
      });
    });
    setQuestsWithProgression(qwp);
  }, [quests, questProgression]);

  return (
    <Container
      chainId={chainId}
      onBack={!!selectedQuestId ? () => setSelectedQuestId(null) : undefined}
      onLogout={onLogout}
    >
      {!selectedQuestId ? (
        <QuestOverview
          questsWithProgression={questsWithProgression}
          onSelect={(id: string) => setSelectedQuestId(id)}
        />
      ) : (
        <QuestDetails
          questsWithProgress={questsWithProgression}
          selectedId={selectedQuestId}
          address={address}
          onClaim={async () => {
            const res = await refetchQuests();
            const quest = res.data.quests?.edges?.find((q) => q.node?.id);
            const progress = res.data.account?.questProgression.edges?.find(
              (qp) => qp.node?.questID === quest?.node?.id,
            );
            if (progress.node?.claimed) {
              toast({
                position: "top-right",
                title: "Quest Complete",
                render: () => (
                  <Flex
                    direction="column"
                    justify="center"
                    position="relative"
                    top="64px"
                    w="360px"
                    h="60px"
                    bg="solid.primary"
                    p="16px 24px 16px 24px"
                    borderRadius="8px"
                  >
                    <Text>Quest Complete</Text>
                  </Flex>
                ),
                duration: 2000,
              });
            }
          }}
        />
      )}
    </Container>
  );
}
