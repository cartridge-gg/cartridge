import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {};

function Toast() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
