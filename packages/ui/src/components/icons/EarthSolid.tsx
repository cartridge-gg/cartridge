import { memo } from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";
import { Props } from "./types";

export const EarthSolidIcon = memo(
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
          d="m12.322 5.51-1.056.79a.665.665 0 0 0-.266.534v.285a.384.384 0 0 0 .597.319l1.306-.872a.396.396 0 0 1 .213-.066h.03a.355.355 0 0 1 .25.603l-.621.622a1.657 1.657 0 0 1-.647.4L11.3 8.4a.437.437 0 0 0-.3.419.453.453 0 0 1-.128.312l-.56.56c-.2.2-.309.468-.309.75v.134c0 .513.425.928.934.928a.913.913 0 0 0 .816-.5l.125-.253a.45.45 0 0 1 .4-.247c.14 0 .272.066.356.178l.51.678a.354.354 0 0 0 .6-.372l-.035-.071a.403.403 0 0 1 .235-.563l.662-.222a.578.578 0 0 0 .397-.55.58.58 0 0 1 .581-.581h.916c.275 0 .5.225.5.5s-.225.5-.5.5h-.647a.857.857 0 0 0-.603.25l-.147.147a.355.355 0 0 0 .25.603h.353a.71.71 0 0 1 .5.206l.203.203a.303.303 0 0 1 0 .425l-.234.235A.626.626 0 0 0 16 12.5c0 .16.063.313.178.428l.572.572c.319.319.753.5 1.206.5h.232a6.518 6.518 0 0 0 .312-2 6.498 6.498 0 0 0-6.178-6.49Zm5.375 9.621a.705.705 0 0 0-.406-.128.71.71 0 0 1-.5-.206l-.416-.422a1.272 1.272 0 0 0-.903-.375c-.303 0-.6-.11-.831-.306l-.829-.713a2.008 2.008 0 0 0-1.3-.481h-.656c-.393 0-.781.116-1.11.334l-.855.572c-.557.372-.891.997-.891 1.666v.1a2 2 0 0 0 .584 1.415l.5.5c.266.266.625.416 1 .416h.666c.416 0 .75.334.75.75 0 .078.012.156.034.228a6.495 6.495 0 0 0 5.163-3.35ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5.853-4.853a.502.502 0 0 0-.706 0l-1 1a.502.502 0 0 0 0 .706.502.502 0 0 0 .706 0l1-1a.502.502 0 0 0 0-.706Z"
        />
      </Icon>
    );
  },
);
