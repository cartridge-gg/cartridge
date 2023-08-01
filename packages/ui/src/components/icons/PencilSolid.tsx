import { memo } from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";
import { Props } from "./types";

export const PencilSolidIcon = memo(
  ({
    variant,
    size,
    boxSize = 6,
    colorScheme,
    orientation,
    styleConfig,
    ...iconProps
  }: Props) => {
    const styles = useStyleConfig("Icon", {
      variant,
      size,
      colorScheme,
      orientation,
      styleConfig,
    });

    return (
      <Icon viewBox="0 0 24 24" __css={styles} boxSize={boxSize} {...iconProps}>
        <path
          fill="currentColor"
          d="m16.838 11.227.354-.353-1.061-1.06-1.943-1.944-1.06-1.06-.354.353-.708.707-6.233 6.233c-.325.325-.563.73-.694 1.17L4.03 19.041a.742.742 0 0 0 .19.741.758.758 0 0 0 .742.191l3.765-1.108c.44-.131.845-.369 1.17-.694l6.233-6.233.707-.71Zm-7.832 5.27-.285.71a1.319 1.319 0 0 1-.416.216l-2.447.72.72-2.444c.044-.153.119-.294.216-.416l.71-.285v1.001c0 .275.226.5.5.5h1.002v-.002ZM15.35 4.585l-.45.453-.708.707-.357.354 1.061 1.06 1.943 1.944 1.06 1.06.354-.353.708-.707.453-.454a2.002 2.002 0 0 0 0-2.832l-1.23-1.232a2.002 2.002 0 0 0-2.831 0h-.003ZM13.866 9.84 9.36 14.347a.502.502 0 0 1-.707 0 .502.502 0 0 1 0-.707l4.505-4.506a.502.502 0 0 1 .708 0 .502.502 0 0 1 0 .707Z"
        />
      </Icon>
    );
  },
);
