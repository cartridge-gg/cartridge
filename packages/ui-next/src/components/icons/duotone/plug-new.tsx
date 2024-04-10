import { forwardRef, memo } from "react";
import { duotoneIconVariants } from "../utils";
import { DuotoneIconProps } from "../types";

export const PlugNewDuoIcon = memo(
  forwardRef<SVGSVGElement, DuotoneIconProps>(
    ({ className, variant, size, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 30 30"
        className={duotoneIconVariants({ variant, size, className })}
        ref={forwardedRef}
        {...props}
      >
        <path
          className="color fill-foreground"
          fillOpacity="0.32"
          d="M9.33333 9.66634H6.66667V5.66634C6.66667 4.93009 7.26375 4.33301 8 4.33301C8.7375 4.33301 9.33333 4.93009 9.33333 5.66634V9.66634ZM17.3333 9.66634H14.6667V5.66634C14.6667 4.93009 15.2625 4.33301 16 4.33301C16.7375 4.33301 17.3333 4.93009 17.3333 5.66634V9.66634ZM4 12.333C4 11.5955 4.59708 10.9997 5.33333 10.9997H18.6667C19.4042 10.9997 20 11.5955 20 12.333C20 12.4288 19.9875 12.5247 19.9708 12.6163C16.9083 13.4622 14.6667 16.3205 14.6667 19.6663C14.6667 20.1413 14.7125 20.6038 14.7958 21.0538C14.3375 21.2663 13.8458 21.4288 13.3333 21.533V25.6663H10.6667V21.533C7.62375 20.8788 5.33333 18.2247 5.33333 14.9997V13.6663C4.59708 13.6663 4 13.0705 4 12.333Z"
        />
        <path
          className="accentColor fill-tertiary"
          d="M28 19.6663C28 22.9788 25.3125 25.6663 22 25.6663C18.6875 25.6663 16 22.9788 16 19.6663C16 16.3538 18.6875 13.6663 22 13.6663C25.3125 13.6663 28 16.3538 28 19.6663ZM21.3333 16.9621V18.9621H19.3333C18.9667 18.9621 18.6667 19.2996 18.6667 19.6288C18.6667 20.0329 18.9667 20.2954 19.3333 20.2954H21.3333V22.2954C21.3333 22.6996 21.6333 22.9621 22 22.9621C22.3667 22.9621 22.6667 22.6996 22.6667 22.2954V20.2954H24.6667C25.0333 20.2954 25.3333 20.0329 25.3333 19.6288C25.3333 19.2996 25.0333 18.9621 24.6667 18.9621H22.6667V16.9621C22.6667 16.6329 22.3667 16.2954 22 16.2954C21.6333 16.2954 21.3333 16.6329 21.3333 16.9621Z"
        />
      </svg>
    ),
  ),
);

PlugNewDuoIcon.displayName = "PlugNewDuoIcon";
