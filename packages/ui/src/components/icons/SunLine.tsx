import { memo } from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";
import { Props } from "./types";

export const SunLineIcon = memo(
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
          d="M15.596 4.41a.506.506 0 0 0-.3-.371.496.496 0 0 0-.474.05L12 6.035 9.179 4.09a.496.496 0 0 0-.475-.05.505.505 0 0 0-.3.371l-.622 3.372L4.41 8.4a.505.505 0 0 0-.371.3.496.496 0 0 0 .05.474L6.035 12 4.09 14.822a.496.496 0 0 0-.05.474.506.506 0 0 0 .371.3l3.372.622.619 3.372a.505.505 0 0 0 .3.371.496.496 0 0 0 .474-.05L12 17.965l2.822 1.946c.14.097.318.116.474.05a.505.505 0 0 0 .3-.371l.622-3.372 3.372-.618a.505.505 0 0 0 .371-.3.496.496 0 0 0-.05-.475L17.965 12l1.946-2.821a.496.496 0 0 0 .05-.475.505.505 0 0 0-.371-.3l-3.372-.622-.622-3.372Zm-3.312 2.644 2.472-1.703.543 2.953a.5.5 0 0 0 .4.4l2.953.543-1.703 2.472a.499.499 0 0 0 0 .569l1.703 2.471-2.953.544a.5.5 0 0 0-.4.4l-.543 2.952-2.472-1.703a.498.498 0 0 0-.568 0l-2.472 1.703-.544-2.952a.5.5 0 0 0-.4-.4l-2.949-.55 1.703-2.472a.499.499 0 0 0 0-.569L5.35 9.245 8.304 8.7a.5.5 0 0 0 .4-.4l.543-2.952L11.72 7.05a.499.499 0 0 0 .569 0l-.004.003ZM12 15.999a4 4 0 1 0 0-7.998A4 4 0 0 0 12 16ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
        />
      </Icon>
    );
  },
);
