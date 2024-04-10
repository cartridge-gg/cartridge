import { memo } from "react";
import { Icon } from "@chakra-ui/react";
import { StateIconProps } from "./types";

export const SunIcon = memo(
  ({ variant = "solid", ...props }: StateIconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
      {(() => {
        switch (variant) {
          case "solid":
            return (
              <path
                className="fill-current"
                d="M15.296 4.039a.506.506 0 0 1 .3.371l.622 3.372 3.372.619a.505.505 0 0 1 .371.3.496.496 0 0 1-.05.474L17.965 12l1.946 2.822c.097.14.116.318.05.474a.505.505 0 0 1-.371.3l-3.372.622-.622 3.372a.505.505 0 0 1-.3.371.496.496 0 0 1-.474-.05L12 17.965 9.179 19.91a.496.496 0 0 1-.475.05.505.505 0 0 1-.3-.371l-.622-3.372-3.372-.622a.506.506 0 0 1-.371-.3.496.496 0 0 1 .05-.474L6.035 12 4.09 9.179a.496.496 0 0 1-.05-.475.505.505 0 0 1 .371-.3l3.372-.622.622-3.372a.505.505 0 0 1 .3-.371.496.496 0 0 1 .475.05L12 6.035l2.822-1.946a.496.496 0 0 1 .474-.05ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm7 0A4 4 0 1 0 8 12a4 4 0 0 0 7.998 0Z"
              />
            );
          case "line":
            return (
              <path
                className="fill-current"
                d="M15.596 4.41a.506.506 0 0 0-.3-.371.496.496 0 0 0-.474.05L12 6.035 9.179 4.09a.496.496 0 0 0-.475-.05.505.505 0 0 0-.3.371l-.622 3.372L4.41 8.4a.505.505 0 0 0-.371.3.496.496 0 0 0 .05.474L6.035 12 4.09 14.822a.496.496 0 0 0-.05.474.506.506 0 0 0 .371.3l3.372.622.619 3.372a.505.505 0 0 0 .3.371.496.496 0 0 0 .474-.05L12 17.965l2.822 1.946c.14.097.318.116.474.05a.505.505 0 0 0 .3-.371l.622-3.372 3.372-.618a.505.505 0 0 0 .371-.3.496.496 0 0 0-.05-.475L17.965 12l1.946-2.821a.496.496 0 0 0 .05-.475.505.505 0 0 0-.371-.3l-3.372-.622-.622-3.372Zm-3.312 2.644 2.472-1.703.543 2.953a.5.5 0 0 0 .4.4l2.953.543-1.703 2.472a.499.499 0 0 0 0 .569l1.703 2.471-2.953.544a.5.5 0 0 0-.4.4l-.543 2.952-2.472-1.703a.498.498 0 0 0-.568 0l-2.472 1.703-.544-2.952a.5.5 0 0 0-.4-.4l-2.949-.55 1.703-2.472a.499.499 0 0 0 0-.569L5.35 9.245 8.304 8.7a.5.5 0 0 0 .4-.4l.543-2.952L11.72 7.05a.499.499 0 0 0 .569 0l-.004.003ZM12 15.999a4 4 0 1 0 0-7.998A4 4 0 0 0 12 16ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
              />
            );
        }
      })()}
    </Icon>
  ),
);
