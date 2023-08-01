import { memo } from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";
import { Props } from "./types";

export const EyeLineIcon = memo(
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
          d="M7.255 8.667c1.197-1.111 2.788-2 4.744-2 1.955 0 3.546.889 4.744 2C17.94 9.778 18.74 11.111 19.109 12c-.37.889-1.17 2.222-2.366 3.333-1.197 1.111-2.789 2-4.744 2-1.956 0-3.547-.889-4.744-2C6.057 14.222 5.258 12.889 4.888 12c.37-.889 1.17-2.222 2.367-3.333Zm4.744-2.889c-2.245 0-4.042 1.022-5.35 2.239-1.3 1.205-2.17 2.65-2.58 3.641a.883.883 0 0 0 0 .684c.41.991 1.28 2.435 2.58 3.641C7.957 17.2 9.754 18.222 12 18.222c2.244 0 4.04-1.022 5.35-2.239 1.299-1.208 2.168-2.65 2.582-3.641a.884.884 0 0 0 0-.684c-.414-.991-1.283-2.436-2.583-3.641-1.308-1.217-3.105-2.239-5.35-2.239ZM9.332 12a2.666 2.666 0 1 1 5.333 0 2.666 2.666 0 0 1-5.333 0Zm6.222 0a3.555 3.555 0 1 0-7.11 0 3.555 3.555 0 0 0 7.11 0Z"
        />
      </Icon>
    );
  },
);
