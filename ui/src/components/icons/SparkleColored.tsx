import React from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";

const SparkleColored = (props: any) => {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("Icon", { variant, size });

  return (
    <Icon viewBox="0 0 31 31" fill="currentColor" __css={styles} {...rest}>
      <path
        d="M11.6211 6.93547C11.743 6.67016 12.0102 6.5 12.3055 6.5C12.5961 6.5 12.8633 6.67016 12.9852 6.93547L15.4555 12.2797L20.7992 14.75C21.0664 14.8719 21.2352 15.1391 21.2352 15.4344C21.2352 15.725 21.0664 15.9922 20.7992 16.1141L15.4555 18.5844L12.9852 23.9281C12.8633 24.1953 12.5961 24.3641 12.3055 24.3641C12.0102 24.3641 11.743 24.1953 11.6211 23.9281L9.15078 18.5844L3.80666 16.1141C3.54111 15.9922 3.37109 15.725 3.37109 15.4344C3.37109 15.1391 3.54111 14.8719 3.80666 14.75L9.15078 12.2797L11.6211 6.93547ZM11.1945 13.2266C10.9695 13.7094 10.5805 14.0984 10.0977 14.3234L7.69859 15.4344L10.0977 16.5406C10.5805 16.7234 10.9695 17.1547 11.1945 17.6375L12.3055 20.0375L13.4117 17.6375C13.5945 17.1547 14.0258 16.7234 14.5086 16.5406L16.9086 15.4344L14.5086 14.3234C14.0258 14.0984 13.5945 13.7094 13.4117 13.2266L12.3055 10.8266L11.1945 13.2266Z"
        fill="#A7E7A7"
      />
      <path
        d="M18.7227 7.49328L21.3711 6.5L22.3648 3.85114C22.4445 3.63992 22.6461 3.5 22.8711 3.5C23.0961 3.5 23.2977 3.63992 23.3773 3.85114L24.3711 6.5L27.0195 7.49328C27.2305 7.5725 27.3711 7.77453 27.3711 8C27.3711 8.225 27.2305 8.42656 27.0195 8.50625L24.3711 9.5L23.3773 12.1484C23.2977 12.3594 23.0961 12.5 22.8711 12.5C22.6461 12.5 22.4445 12.3594 22.3648 12.1484L21.3711 9.5L18.7227 8.50625C18.4695 8.42656 18.3711 8.225 18.3711 8C18.3711 7.77453 18.4695 7.5725 18.7227 7.49328ZM22.3648 18.8516C22.4445 18.5984 22.6461 18.5 22.8711 18.5C23.0961 18.5 23.2977 18.5984 23.3773 18.8516L24.3711 21.5L27.0195 22.4938C27.2305 22.5734 27.3711 22.775 27.3711 23C27.3711 23.225 27.2305 23.4266 27.0195 23.5063L24.3711 24.5L23.3773 27.1484C23.2977 27.3594 23.0961 27.5 22.8711 27.5C22.6461 27.5 22.4445 27.3594 22.3648 27.1484L21.3711 24.5L18.7227 23.5063C18.4695 23.4266 18.3711 23.225 18.3711 23C18.3711 22.775 18.4695 22.5734 18.7227 22.4938L21.3711 21.5L22.3648 18.8516Z"
        fill="white"
        fill-opacity="0.48"
      />
    </Icon>
  );
};

export default SparkleColored;
