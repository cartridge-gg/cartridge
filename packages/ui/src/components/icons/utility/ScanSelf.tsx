import { memo } from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";
import { Props } from "../types";

export const ScanSelfIcon = memo(
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
          d="M3.129 4.366c0-.478.388-.866.866-.866h3.028a.866.866 0 0 1 0 1.731H4.86v2.163a.866.866 0 0 1-1.731 0V4.366ZM16.049 4.316c0-.45.366-.816.816-.816h2.448c.45 0 .816.366.816.816v2.448a.816.816 0 0 1-1.632 0V5.132h-1.632a.816.816 0 0 1-.816-.816ZM5.033 17.236c0-.45-.426-.816-.952-.816s-.952.366-.952.816v2.448c0 .45.426.816.952.816h2.856c.525 0 .952-.366.952-.816 0-.45-.427-.816-.952-.816H5.033v-1.632ZM19.313 16.42c.45 0 .816.366.816.816v2.448c0 .45-.366.816-.816.816h-2.448a.816.816 0 0 1 0-1.632h1.632v-1.632c0-.45.365-.816.816-.816Z"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M14.417 10.232c0 .345-.06.675-.171.977 1.039.306 1.803 1.336 1.803 2.559v1.768c0 .489-.365.884-.816.884H8.704c-.45 0-.815-.395-.815-.884v-1.768c0-1.223.764-2.253 1.803-2.56a2.827 2.827 0 0 1-.171-.976c0-1.465 1.096-2.652 2.448-2.652 1.352 0 2.448 1.187 2.448 2.652Zm-4.896 3.536c0-.488.365-.884.816-.884h3.264c.45 0 .816.396.816.884v.884H9.521v-.884Zm1.632-3.536c0 .488.365.884.816.884.45 0 .816-.396.816-.884s-.366-.884-.816-.884c-.45 0-.816.396-.816.884Z"
          clipRule="evenodd"
        />
      </Icon>
    );
  },
);
