import { memo } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

export const WedgeLeftIcon = memo((props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M9.25 12c0-.176.067-.352.201-.486l4.125-4.125a.687.687 0 1 1 .973.972L10.909 12l3.639 3.64a.687.687 0 1 1-.972.971L9.45 12.486A.686.686 0 0 1 9.25 12Z"
    />
  </Icon>
));
