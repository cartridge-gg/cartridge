import { Icon, useStyleConfig } from "@chakra-ui/react";
import { Props } from "../types";

export function ConnectIcon({
  variant,
  size,
  colorScheme,
  orientation,
  styleConfig,
  ...iconProps
}: Props) {
  const styles = useStyleConfig("Icon", {
    variant,
    size,
    colorScheme,
    orientation,
    styleConfig,
  });

  return (
    <Icon viewBox="0 0 12 12" fill="currentColor" __css={styles} {...iconProps}>
      <path d="M7.22178 6.57384C7.03206 6.38412 6.74106 6.38412 6.5642 6.57384L5.48915 7.64889L4.35085 6.5106L5.42591 5.43555C5.60277 5.24583 5.60277 4.95483 5.42591 4.77797C5.23619 4.6011 4.94519 4.6011 4.76833 4.77797L3.69328 5.85302L2.7447 4.90445C2.52979 4.68954 2.20075 4.68954 1.98584 4.90445C1.77093 5.11936 1.77093 5.46074 1.98584 5.66331L2.15036 5.82783L1.60641 6.37178C0.632637 7.34555 0.518505 8.87615 1.26502 9.97637L0.151924 11.0895C-0.0506413 11.292 -0.0506413 11.6458 0.151924 11.8483C0.265556 11.962 0.392028 12 0.531355 12C0.670681 12 0.809502 11.9496 0.910785 11.8483L2.02388 10.7352C2.5046 11.0643 3.06089 11.2283 3.61774 11.2283C4.35141 11.2283 5.07223 10.9501 5.62847 10.3933L6.17242 9.84939L6.33695 10.0139C6.43823 10.1152 6.57705 10.1656 6.71638 10.1656C6.8557 10.1656 6.99452 10.1152 7.09581 10.0139C7.31072 9.799 7.31072 9.45761 7.09581 9.25505L6.16008 8.31932L7.23513 7.24427C7.39916 7.05455 7.39915 6.76356 7.22178 6.57384ZM4.86956 9.63445C4.17394 10.3301 3.06082 10.3301 2.36519 9.63445C1.66957 8.93883 1.66957 7.82571 2.36519 7.13009L2.90914 6.58613L5.41351 9.0905L4.86956 9.63445Z" />
      <path d="M11.851 0.161182C11.6361 -0.0537274 11.2947 -0.0537274 11.0922 0.161182L9.97907 1.27428C8.87882 0.553463 7.32306 0.66709 6.37448 1.61567L5.83053 2.15962L5.66601 1.9951C5.4511 1.78019 5.12206 1.78019 4.90715 1.9951C4.69224 2.21001 4.69224 2.55139 4.90715 2.75396L9.24543 7.09224C9.34671 7.19352 9.48553 7.24391 9.62486 7.24391C9.76419 7.24391 9.90301 7.19352 10.0043 7.09224C10.2192 6.87733 10.2192 6.53595 10.0043 6.33338L9.83977 6.16886L10.3837 5.62491C10.9148 5.09381 11.2187 4.37299 11.2187 3.61418C11.2187 3.03218 11.0418 2.48874 10.7256 2.02032L11.8387 0.907219C12.0531 0.705146 12.0531 0.363242 11.851 0.161182ZM9.62478 4.8789L9.08083 5.42285L6.57697 2.91848L7.12092 2.37453C7.79135 1.7041 8.95484 1.7041 9.62529 2.37453C9.95433 2.70357 10.144 3.15858 10.144 3.62645C10.1436 4.09431 9.96618 4.54987 9.62478 4.8789Z" />
    </Icon>
  );
}
