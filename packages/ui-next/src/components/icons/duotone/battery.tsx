import { forwardRef, memo } from "react";
import { duotoneIconVariants } from "../utils";
import { DuotoneIconProps } from "../types";

export const BatteryDuoIcon = memo(
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
          d="M17.0167 8.88892H21.7222C23.4104 8.88892 24.7778 10.2563 24.7778 11.9445V12.5556C25.4538 12.5556 26 13.1018 26 13.7778V16.2222C26 16.8983 25.4538 17.4445 24.7778 17.4445V18.0556C24.7778 19.7438 23.4104 21.1111 21.7222 21.1111H13.3538C13.4417 21.0577 13.5257 20.9966 13.6097 20.9278L16.3559 18.6667H21.7222C22.0583 18.6667 22.3333 18.3917 22.3333 18.0556V11.9445C22.3333 11.6084 22.0583 11.3334 21.7222 11.3334H17.9677C18.2198 10.4854 17.9219 9.5535 17.2 9.01114C17.1427 8.96683 17.0816 8.92635 17.0167 8.88892ZM11.15 21.1111H7.05556C5.36813 21.1111 4 19.7438 4 18.0556V11.9445C4 10.2563 5.36813 8.88892 7.05556 8.88892H14.8128C14.725 8.94277 14.641 8.96912 14.5569 9.07225L11.8108 11.3334H7.05556C6.71792 11.3334 6.44444 11.6084 6.44444 11.9445V18.0556C6.44444 18.3917 6.71792 18.6667 7.05556 18.6667H10.199C9.94688 19.5146 10.2448 20.4466 10.9667 20.9889C11.024 21.0004 11.0851 21.0729 11.15 21.1111Z"
        />
        <path
          className="accentColor fill-tertiary"
          d="M15.0115 14.3889H17.4445C17.7042 14.3889 17.9334 14.5493 18.0212 14.7937C18.1052 15.0038 18.0327 15.3094 17.8341 15.4736L12.6396 19.7514C12.4219 19.9271 12.1087 19.9347 11.8834 19.7666C11.658 19.5986 11.5778 19.2969 11.6886 19.0371L13.1552 15.5767H10.7223C10.4625 15.5767 10.2334 15.4507 10.1455 15.2062C10.0615 14.9618 10.1341 14.6906 10.3327 14.5264L15.5271 10.2486C15.7448 10.0385 16.058 10.0653 16.2834 10.2333C16.5087 10.4014 16.5889 10.7031 16.4782 10.9628L15.0115 14.3889Z"
        />
      </svg>
    ),
  ),
);

BatteryDuoIcon.displayName = "BatteryDuoIcon";
