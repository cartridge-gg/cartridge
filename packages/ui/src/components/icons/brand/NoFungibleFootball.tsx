import { memo } from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";
import { Props } from "../types";

export const NoFungibleFootballIcon = memo(
  ({
    variant,
    size,
    boxSize = 6,
    colorScheme,
    orientation,
    styleConfig,
    ...iconProps
  }: Props) => {
    const styles = useStyleConfig("Icon", {
      variant,
      size,
      colorScheme,
      orientation,
      styleConfig,
    });

    return (
      <Icon viewBox="0 0 24 24" __css={styles} boxSize={boxSize} {...iconProps}>
        <path
          d="M8.29532 11.0649C8.29532 11.2836 7.29312 11.218 7.44983 11.4221C8.29897 12.468 9.14082 13.5978 10.1357 14.5854C10.1357 14.0169 10.0665 12.7195 10.0665 11.8995C10.0665 11.1779 10.8027 11.1269 10.8027 11.0649C10.8027 10.8754 10.0337 11.0431 10.0337 10.6058C10.0337 9.97892 9.8041 9.00587 10.2779 9.00587H11.0651C11.4076 9.00587 11.3202 9.84043 11.3202 10.1247C11.3202 11.1633 12.2349 10.7442 12.2349 11.0103C12.2349 11.3128 11.3092 10.8827 11.3092 11.6298C11.3092 12.2494 11.3092 12.9491 11.3092 13.616C11.3092 14.6182 11.4404 15.7771 10.9339 15.8026C9.8697 15.8537 9.43237 15.963 9.01691 15.4528C8.30626 14.5672 6.73553 12.8288 5.68959 11.4913C5.25591 10.9337 4.5817 10.2778 4.53797 10.5839C4.46143 11.116 4.50881 12.0526 4.50881 12.5446C4.50881 13.0038 4.53797 13.3463 4.53797 13.6197C4.53797 14.5672 5.66408 14.1481 5.66408 14.4396C5.66408 14.6146 4.71654 14.3485 4.71654 14.8332C4.71654 14.9316 4.69467 15.041 4.69467 15.1795C4.69467 15.4528 4.69103 15.7589 4.23184 15.7589C3.77265 15.7589 3.01097 15.85 3.01097 15.42C3.01097 15.1722 3.04377 14.979 3.04377 14.713C3.04377 14.4141 3.88562 14.4105 4.07149 14.4105C4.21362 14.4105 3.00733 14.2028 3.00733 13.4411C3.00733 12.581 3.0219 12.2275 3.05835 11.5897C3.08021 11.1852 3.4155 11.3055 3.87104 11.2289C2.734 11.2289 3.03648 10.2231 3.03648 9.58532C3.03648 9.0168 3.58314 9.00222 4.18446 9.00222C5.18667 9.00222 5.54382 9.27191 6.18523 9.91332C7.71951 11.4476 8.28439 10.7661 8.28439 11.0613L8.29532 11.0649Z"
          fill="currentColor"
        />
        <path
          d="M20.9778 12.3368C20.9851 11.9177 20.832 11.7355 20.3983 11.7392C19.2758 11.7537 18.157 11.761 17.0345 11.7392C16.5316 11.7282 16.4296 11.9578 16.4259 12.3988C16.4186 12.8762 16.6701 12.9491 17.0528 12.9382C17.5994 12.9272 18.1424 12.9382 18.6891 12.9382C19.1374 12.9382 19.5929 12.8325 19.582 13.5796C19.571 14.2939 19.254 14.4615 18.6308 14.4178C18.1497 14.385 17.6614 14.4178 17.1767 14.4105C14.939 14.3777 14.6548 14.8259 14.6147 12.5118C14.6147 12.1145 14.6475 11.7464 14.7568 11.5096C14.9354 11.1269 15.7153 11.4622 15.7153 11.1779C15.7153 10.941 14.8479 11.3419 14.8516 10.7953C14.8516 10.7625 14.8698 10.726 14.8844 10.6969C15.0884 10.4818 15.4201 10.398 15.9449 10.3907C17.399 10.3762 18.8531 10.3689 20.3072 10.3907C20.8284 10.398 20.9923 10.2122 20.9851 9.70559C20.9778 9.23182 20.8976 8.97307 20.34 9.00222C19.5237 9.04231 18.7037 9.01316 17.8873 9.01316V9.02045C17.0382 9.02045 16.1891 8.984 15.3436 9.02773C14.1045 9.08969 13.4157 9.63999 13.2262 10.7078H13.2335C13.1715 11.0358 13.5104 11.0686 14.079 11.1816C13.6635 11.3018 13.4703 11.331 13.3136 11.6262C13.1679 11.8922 13.1387 12.2129 13.1424 12.5081H13.146C13.1424 12.8835 13.1424 13.2589 13.1496 13.6379C13.1861 14.9426 13.8457 15.6751 15.1577 15.737C16.6993 15.8099 18.2481 15.7808 19.7933 15.7844C20.5732 15.7844 20.9668 15.3471 20.9923 14.6036C21.0179 13.8493 20.9705 13.0912 20.9814 12.3368H20.9778Z"
          fill="currentColor"
        />
      </Icon>
    );
  },
);
