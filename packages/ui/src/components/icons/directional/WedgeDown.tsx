import { memo } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

export const WedgeDownIcon = memo((props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 15.5a.747.747 0 0 1-.53-.22l-4.5-4.5a.75.75 0 1 1 1.06-1.06L12 13.69l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.748.748 0 0 1-.53.22Z"
    />
  </Icon>
));
