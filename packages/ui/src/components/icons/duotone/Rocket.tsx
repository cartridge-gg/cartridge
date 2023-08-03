import { memo } from "react";
import { Icon, useToken } from "@chakra-ui/react";
import { DuotoneIconProps } from "./types";

export const RocketDuoIcon = memo(
  ({ accent = "brand.accent", ...props }: DuotoneIconProps) => {
    const accentToken = useToken("colors", accent as string);

    return (
      <Icon viewBox="0 0 30 31" {...props}>
        <path
          fill="currentColor"
          fillOpacity=".36"
          d="M13.613 21.34a4.78 4.78 0 0 0-4.525-4.456c.92-2.059 2.51-5.44 3.816-7.37 3.519-5.189 8.76-5.364 11.889-4.787.503.092.89.479.98.979.575 3.13.404 8.372-4.787 11.89-1.92 1.298-5.29 2.841-7.373 3.743ZM20.5 8.28a1.718 1.718 0 1 0 0 3.437 1.718 1.718 0 0 0 0-3.437Z"
        />
        <path
          fill={accentToken}
          d="M4.993 16.875c-.334 0-.677-.202-.86-.524-.183-.327-.176-.76.017-1.044l2.268-3.73a3.096 3.096 0 0 1 2.644-1.491h3.472c-1.225 1.972-2.608 4.92-3.442 6.789H4.993Zm15.383 4.563c0 1.083-.529 2.084-1.453 2.647l-3.73 2.264a1.032 1.032 0 0 1-1.043.018c-.323-.18-.563-.525-.563-.898v-4.134c1.925-.816 4.868-2.161 6.789-3.369v3.472Zm-9.221 3.257c-2.127 2.127-7.134 1.783-7.134 1.783s-.343-5.044 1.783-7.132a3.782 3.782 0 0 1 5.35 0 3.781 3.781 0 0 1 0 5.35Zm-2.007-3.343a1.261 1.261 0 0 0-1.78 0c-.707.71-.593 2.372-.593 2.372s1.664.116 2.373-.593a1.26 1.26 0 0 0 0-1.779Z"
        />
      </Icon>
    );
  },
);
