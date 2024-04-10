import { forwardRef, memo } from "react";
import { iconVariants } from "../utils";
import { StateIconProps } from "../types";

export const EarthIcon = memo(
  forwardRef<SVGSVGElement, StateIconProps>(
    ({ className, size, variant, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 24 24"
        className={iconVariants({ size, className })}
        ref={forwardedRef}
        {...props}
      >
        {(() => {
          switch (variant) {
            case "solid":
              return (
                <path
                  className="fill-current"
                  d="m12.322 5.51-1.056.79a.665.665 0 0 0-.266.534v.285a.384.384 0 0 0 .597.319l1.306-.872a.396.396 0 0 1 .213-.066h.03a.355.355 0 0 1 .25.603l-.621.622a1.657 1.657 0 0 1-.647.4L11.3 8.4a.437.437 0 0 0-.3.419.453.453 0 0 1-.128.312l-.56.56c-.2.2-.309.468-.309.75v.134c0 .513.425.928.934.928a.913.913 0 0 0 .816-.5l.125-.253a.45.45 0 0 1 .4-.247c.14 0 .272.066.356.178l.51.678a.354.354 0 0 0 .6-.372l-.035-.071a.403.403 0 0 1 .235-.563l.662-.222a.578.578 0 0 0 .397-.55.58.58 0 0 1 .581-.581h.916c.275 0 .5.225.5.5s-.225.5-.5.5h-.647a.857.857 0 0 0-.603.25l-.147.147a.355.355 0 0 0 .25.603h.353a.71.71 0 0 1 .5.206l.203.203a.303.303 0 0 1 0 .425l-.234.235A.626.626 0 0 0 16 12.5c0 .16.063.313.178.428l.572.572c.319.319.753.5 1.206.5h.232a6.518 6.518 0 0 0 .312-2 6.498 6.498 0 0 0-6.178-6.49Zm5.375 9.621a.705.705 0 0 0-.406-.128.71.71 0 0 1-.5-.206l-.416-.422a1.272 1.272 0 0 0-.903-.375c-.303 0-.6-.11-.831-.306l-.829-.713a2.008 2.008 0 0 0-1.3-.481h-.656c-.393 0-.781.116-1.11.334l-.855.572c-.557.372-.891.997-.891 1.666v.1a2 2 0 0 0 .584 1.415l.5.5c.266.266.625.416 1 .416h.666c.416 0 .75.334.75.75 0 .078.012.156.034.228a6.495 6.495 0 0 0 5.163-3.35ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5.853-4.853a.502.502 0 0 0-.706 0l-1 1a.502.502 0 0 0 0 .706.502.502 0 0 0 .706 0l1-1a.502.502 0 0 0 0-.706Z"
                />
              );
            case "line":
              return (
                <path
                  className="fill-current"
                  d="M9.853 7.147a.496.496 0 0 1 0 .706l-1 1a.496.496 0 0 1-.706 0 .496.496 0 0 1 0-.706l1-1a.498.498 0 0 1 .706 0ZM4 12a8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8Zm14.928 1a7.002 7.002 0 0 0-6.05-7.946l-.14.558c.468-.118.971.065 1.25.478a1.165 1.165 0 0 1-.444 1.697l-1.85.926a.352.352 0 0 0-.194.315c0 .275-.11.538-.303.734l-.584.582a.388.388 0 0 0-.113.272v.05a.333.333 0 0 0 .6.2l.334-.447c.2-.29.51-.419.838-.419.278 0 .547.11.74.306l.091.09a.208.208 0 0 0 .294 0L14.4 9.395a.644.644 0 0 1 1.1.453v.297c0 .197.16.356.356.356h.116c.734 0 1.14.847.656 1.419a.375.375 0 0 0 .075.475l.497.412a.83.83 0 0 0 .531.194h1.197Zm-.219 1h-.978c-.428 0-.844-.15-1.172-.425l-.497-.412a1.346 1.346 0 0 1-.321-1.67 1.35 1.35 0 0 1-1.153-.871l-.485.481a1.205 1.205 0 0 1-1.706 0l-.09-.09a.065.065 0 0 0-.032-.013.05.05 0 0 0-.04.019l-.335.447a1.334 1.334 0 0 1-2.4-.8v-.05c0-.394.147-.72.378-.979l.61-.584a.028.028 0 0 0 .012-.025c0-.512.29-.981.747-1.212l1.85-.923c.062-.045.119-.16.062-.243-.046-.068-.137-.093-.209-.084l-.253.15a.748.748 0 0 1-1.053-.853l.215-.861A7 7 0 0 0 5 12c0 3.831 3.081 6.947 6.9 6.972-.178-.269-.46-.472-.816-.472-.506 0-.993-.203-1.353-.56l-.5-.5a2.502 2.502 0 0 1-.731-1.768v-.1c0-.838.419-1.619 1.113-2.081l.856-.572c.41-.272.894-.419 1.387-.419h.653c.597 0 1.175.213 1.628.603l.804.71a.895.895 0 0 0 .53.187c.473 0 .923.16 1.257.519l.125.128c.228.225.534.353.853.353h.619c.153-.322.281-.656.384-1Zm-.965 2h-.038a2.197 2.197 0 0 1-1.56-.647l-.127-.125c-.172-.147-.34-.228-.547-.228a1.78 1.78 0 0 1-1.156-.428l-.829-.71c-.271-.234-.618-.39-.978-.39h-.653c-.297 0-.587.116-.831.281l-.856.569a1.498 1.498 0 0 0-.669 1.25v.1c0 .397.16.778.44 1.06l.5.5a.86.86 0 0 0 .644.268c.894 0 1.644.61 1.857 1.41A6.852 6.852 0 0 0 17.744 16Z"
                />
              );
          }
        })()}
      </svg>
    ),
  ),
);

EarthIcon.displayName = "EarthIcon";
