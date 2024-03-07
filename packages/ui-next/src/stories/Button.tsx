import { PropsWithChildren } from "react";

type ButtonProps = {
  className: string;
} & PropsWithChildren;

/**
 * Button component
 */
export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button type="button" className={`bg-red-900 ${className}`} {...props}>
      {children}
    </button>
  );
}
