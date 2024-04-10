import { forwardRef, memo } from "react";
import { duotoneIconVariants } from "../utils";
import { DuotoneIconProps } from "../types";

export const GemDuoIcon = memo(
  forwardRef<SVGSVGElement, DuotoneIconProps>(
    ({ className, variant, size, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 30 30"
        className={duotoneIconVariants({ variant, size, className })}
        ref={forwardedRef}
        {...props}
      >
        <path
          className="accentColor fill-tertiary"
          d="M11.9374 8.47862C11.8422 8.3766 11.6858 8.363 11.5736 8.44462C11.4613 8.52623 11.4307 8.68266 11.5022 8.80168L13.4541 12.0526L8.44844 12.4709C8.30901 12.4811 8.2002 12.6001 8.2002 12.7429C8.2002 12.8858 8.30901 13.0014 8.44844 13.015L14.9775 13.5591C14.9911 13.5591 15.0081 13.5591 15.0218 13.5591L21.5509 13.015C21.6903 13.0048 21.7991 12.8858 21.7991 12.7429C21.7991 12.6001 21.6903 12.4845 21.5509 12.4709L16.5486 12.056L18.5005 8.80508C18.572 8.68606 18.5413 8.52963 18.4291 8.44802C18.3169 8.3664 18.1605 8.38 18.0653 8.48202L15.0013 11.7976L11.9374 8.47862Z"
        />
        <path
          className="color fill-current"
          fillOpacity="0.32"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.77618 5.85933C9.12332 5.38875 9.67875 5.10083 10.274 5.10083H19.7272C20.3143 5.10083 20.8745 5.37837 21.227 5.86189C21.2277 5.86294 21.2285 5.864 21.2293 5.86506L25.636 11.8457C25.6363 11.8459 25.6365 11.8462 25.6367 11.8465C26.1663 12.5638 26.1071 13.5458 25.5232 14.1989L25.5191 14.2035L16.3764 24.292C16.0273 24.6714 15.5331 24.8991 15.0006 24.8991C14.4681 24.8991 13.974 24.6714 13.6249 24.2919L13.6203 24.2869L4.48221 14.2035C3.88478 13.544 3.83886 12.5584 4.3647 11.8463C4.36453 11.8466 4.36486 11.8461 4.3647 11.8463L8.77618 5.85933ZM10.2515 6.94769L5.83953 12.9354C5.83022 12.948 5.83184 12.9626 5.84081 12.9725L14.9741 23.0507C14.9745 23.051 14.9748 23.0514 14.9751 23.0518C14.9816 23.0585 14.9874 23.062 14.9912 23.0636C14.9949 23.0653 14.9978 23.0658 15.0006 23.0658C15.0035 23.0658 15.0064 23.0653 15.0101 23.0636C15.0139 23.062 15.0196 23.0585 15.0261 23.0518C15.0264 23.0514 15.0268 23.051 15.0271 23.0507L24.1565 12.9769C24.1567 12.9766 24.1569 12.9764 24.1572 12.9761C24.1632 12.969 24.1661 12.9611 24.1666 12.9528C24.1668 12.9486 24.1662 12.9451 24.1655 12.9427C24.1649 12.9406 24.1639 12.9384 24.1617 12.9354L19.7455 6.94197C19.7434 6.93903 19.7375 6.93417 19.7272 6.93417H10.274C10.2734 6.93417 10.2698 6.93436 10.2643 6.93719C10.2585 6.9401 10.2542 6.9441 10.2515 6.94769Z"
        />
      </svg>
    ),
  ),
);

GemDuoIcon.displayName = "GemDuoIcon";
