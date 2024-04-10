import { forwardRef, memo } from "react";
import { duotoneIconVariants } from "../utils";
import { DuotoneIconProps } from "../types";

export const StarterpackDuoIcon = memo(
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.21224 6.5C5.68093 6.5 3.62891 8.55203 3.62891 11.0833V21.3194C3.62891 22.5851 4.65492 23.6111 5.92057 23.6111H23.3372C24.6029 23.6111 25.6289 22.5851 25.6289 21.3194V11.0833C25.6289 8.55203 23.5769 6.5 21.0456 6.5H8.21224ZM18.7539 8.02778H10.5039V12.9931C10.5039 13.1196 10.4013 13.2222 10.2747 13.2222H9.2053C9.07873 13.2222 8.97613 13.1196 8.97613 12.9931V8.02778H8.21224C6.5247 8.02778 5.15668 9.3958 5.15668 11.0833V21.3194C5.15668 21.7413 5.49869 22.0833 5.92057 22.0833H8.97613V18.0347C8.97613 17.9082 9.07873 17.8056 9.2053 17.8056H10.2747C10.4013 17.8056 10.5039 17.9082 10.5039 18.0347V22.0833H18.7539V18.0347C18.7539 17.9082 18.8565 17.8056 18.9831 17.8056H20.0525C20.1791 17.8056 20.2817 17.9082 20.2817 18.0347V22.0833H23.3372C23.7591 22.0833 24.1011 21.7413 24.1011 21.3194V11.0833C24.1011 9.3958 22.7331 8.02778 21.0456 8.02778H20.2817V12.9931C20.2817 13.1196 20.1791 13.2222 20.0525 13.2222H18.9831C18.8565 13.2222 18.7539 13.1196 18.7539 12.9931V8.02778Z"
          ill-opacity="0.32"
        />
        <path
          className="accentColor fill-tertiary"
          d="M13.5595 12.4584C13.3064 12.4584 13.1011 12.6636 13.1011 12.9167V15.0556H7.4553C7.32875 15.0556 7.22614 15.1582 7.22614 15.2848V15.7431C7.22614 15.8697 7.32875 15.9723 7.4553 15.9723H13.1011V18.1112C13.1011 18.3643 13.3064 18.5695 13.5595 18.5695H15.6984C15.9515 18.5695 16.1567 18.3643 16.1567 18.1112V15.9723H21.8025C21.9291 15.9723 22.0317 15.8697 22.0317 15.7431V15.2848C22.0317 15.1582 21.9291 15.0556 21.8025 15.0556H16.1567V12.9167C16.1567 12.6636 15.9515 12.4584 15.6984 12.4584H13.5595Z"
        />
      </svg>
    ),
  ),
);

StarterpackDuoIcon.displayName = "StarterpackDuoIcon";
