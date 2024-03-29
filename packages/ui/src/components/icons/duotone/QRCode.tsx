import { memo } from "react";
import { Icon, useToken } from "@chakra-ui/react";
import { DuotoneIconProps } from "./types";

export const QRCodeDuoIcon = memo(
  ({ accent = "brand.accent", ...props }: DuotoneIconProps) => {
    const accentToken = useToken("colors", accent as string);

    return (
      <Icon viewBox="0 0 30 31" {...props}>
        <path
          fill="currentColor"
          fillOpacity=".32"
          d="M.983 13h1.905c.554 0 .983-.498.983-1.061l.002-6.2c0-.597.43-1.06.983-1.06h5.717c.553 0 .983-.498.983-1.062V1.561c0-.597-.461-1.061-.983-1.061H4.886C2.182.5 0 2.855 0 5.739v6.168c0 .595.46 1.092.983 1.092ZM28.988 18.834h-1.9a.994.994 0 0 0-.98.992v5.772a.974.974 0 0 1-.981.993h-5.702a.994.994 0 0 0-.981.993v1.923c0 .56.46.993.98.993h5.703c2.666 0 4.873-2.204 4.873-4.933v-5.709c-.031-.559-.49-1.024-1.012-1.024ZM25.113.5h-5.686c-.554 0-.983.499-.983 1.064v2.06c0 .6.46 1.064.983 1.064h5.717c.554 0 .984.465.984 1.064v6.184c0 .599.46 1.064.983 1.064h1.905c.554 0 .984-.499.984-1.064V5.753C30 2.861 27.817.5 25.113.5ZM10.544 26.57h-5.67a.972.972 0 0 1-.981-.99v-5.756c0-.557-.46-.99-.981-.99l-1.931-.001a.992.992 0 0 0-.981.99v5.757c0 2.692 2.177 4.92 4.873 4.92h5.702c.552 0 .981-.465.981-.99V27.59c0-.587-.46-1.021-1.012-1.021Z"
        />
        <path
          fill={accentToken}
          d="M9 9.5h4v4H9v-4ZM13 13.5h4v4h-4v-4ZM17 9.5h4v4h-4v-4ZM17 17.5h4v4h-4v-4ZM9 17.5h4v4H9v-4Z"
        />
      </Icon>
    );
  },
);
