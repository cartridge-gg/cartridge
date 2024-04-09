import { forwardRef, memo } from "react";
import { iconVariants } from "../utils";
import { IconProps } from "../types";

export const GitHubIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(
    ({ className, size, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 24 24"
        className={iconVariants({ size, className })}
        ref={forwardedRef}
        {...props}
      >
        <path
          d="M10.091 14.5745C10.091 15.3147 9.705 16.526 8.79125 16.526C7.8775 16.526 7.49146 15.3147 7.49146 14.5745C7.49146 13.8343 7.8775 12.623 8.79125 12.623C9.705 12.623 10.091 13.8343 10.091 14.5745ZM20.5 12.786C20.5 13.9157 20.3867 15.1128 19.8802 16.1505C18.5379 18.8635 14.8475 18.7997 12.2054 18.7997C9.52083 18.7997 5.61083 18.8953 4.21542 16.1505C3.69833 15.1235 3.5 13.9157 3.5 12.786C3.5 11.302 3.99229 9.8995 4.96979 8.76262C4.78562 8.20304 4.69708 7.61512 4.69708 7.03429C4.69708 6.27283 4.87063 5.89033 5.21417 5.19971C6.81854 5.19971 7.84562 5.51846 9.0675 6.47471C10.0946 6.23033 11.15 6.12054 12.209 6.12054C13.1652 6.12054 14.1285 6.22325 15.0565 6.44637C16.2606 5.50075 17.2877 5.19971 18.8744 5.19971C19.2215 5.89033 19.3915 6.27283 19.3915 7.03429C19.3915 7.61512 19.2994 8.19242 19.1187 8.74137C20.0927 9.88887 20.5 11.302 20.5 12.786ZM18.2227 14.5745C18.2227 13.0197 17.2771 11.6491 15.6196 11.6491C14.9502 11.6491 14.3092 11.7695 13.6363 11.8616C13.1085 11.943 12.5808 11.9749 12.039 11.9749C11.5006 11.9749 10.9729 11.943 10.4417 11.8616C9.77938 11.7695 9.13125 11.6491 8.45833 11.6491C6.80083 11.6491 5.85521 13.0197 5.85521 14.5745C5.85521 17.6841 8.70271 18.1622 11.1819 18.1622H12.889C15.3787 18.1622 18.2227 17.6876 18.2227 14.5745ZM15.2973 12.623C14.3835 12.623 13.9975 13.8343 13.9975 14.5745C13.9975 15.3147 14.3835 16.526 15.2973 16.526C16.211 16.526 16.5971 15.3147 16.5971 14.5745C16.5971 13.8343 16.211 12.623 15.2973 12.623Z"
          fill="currentColor"
        />
      </svg>
    ),
  ),
);

GitHubIcon.displayName = "GitHubIcon";
