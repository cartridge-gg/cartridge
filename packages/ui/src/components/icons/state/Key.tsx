import { memo } from "react";
import { Icon } from "@chakra-ui/react";
import { StateIconProps } from "./types";

export const KeyIcon = memo(
  ({ variant = "solid", ...props }: StateIconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
      {(() => {
        switch (variant) {
          case "solid":
            return (
              <path
                fill="currentColor"
                d="M14.5 15C17.5375 15 20 12.5375 20 9.5C20 6.4625 17.5375 4 14.5 4C11.4625 4 9 6.4625 9 9.5C9 10.0844 9.09063 10.65 9.25938 11.1781L4.21875 16.2188C4.07812 16.3594 4 16.55 4 16.75V19.25C4 19.6656 4.33437 20 4.75 20H7.25C7.66563 20 8 19.6656 8 19.25V18H9.25C9.66563 18 10 17.6656 10 17.25V16H11.25C11.45 16 11.6406 15.9219 11.7812 15.7812L12.8219 14.7406C13.35 14.9094 13.9156 15 14.5 15ZM15.75 7C16.0815 7 16.3995 7.1317 16.6339 7.36612C16.8683 7.60054 17 7.91848 17 8.25C17 8.58152 16.8683 8.89946 16.6339 9.13388C16.3995 9.3683 16.0815 9.5 15.75 9.5C15.4185 9.5 15.1005 9.3683 14.8661 9.13388C14.6317 8.89946 14.5 8.58152 14.5 8.25C14.5 7.91848 14.6317 7.60054 14.8661 7.36612C15.1005 7.1317 15.4185 7 15.75 7Z"
              />
            );
          case "line":
            return (
              <path
                fill="currentColor"
                d="M10 9.5C10 7.01562 12.0156 5 14.5 5C16.9844 5 19 7.01562 19 9.5C19 11.9844 16.9844 14 14.5 14C14.1531 14 13.8125 13.9594 13.4875 13.8875C13.3188 13.85 13.1438 13.9 13.0219 14.0219L12.0437 15H10.5C10.225 15 10 15.225 10 15.5V17H8.5C8.225 17 8 17.225 8 17.5V19H5V16.4563L10.0875 11.3688C10.2188 11.2375 10.2656 11.0406 10.2094 10.8625C10.0719 10.4313 10 9.975 10 9.49687V9.5ZM14.5 4C11.4625 4 9 6.4625 9 9.5C9 9.97188 9.05937 10.4312 9.17188 10.8719L4.14687 15.8969C4.05312 15.9906 4 16.1187 4 16.25V19.5C4 19.775 4.225 20 4.5 20H8.5C8.775 20 9 19.775 9 19.5V18H10.5C10.775 18 11 17.775 11 17.5V16H12.25C12.3813 16 12.5094 15.9469 12.6031 15.8531L13.5406 14.9156C13.8531 14.9719 14.1719 15 14.5 15C17.5375 15 20 12.5375 20 9.5C20 6.4625 17.5375 4 14.5 4ZM15.5 9.25C15.6989 9.25 15.8897 9.17098 16.0303 9.03033C16.171 8.88968 16.25 8.69891 16.25 8.5C16.25 8.30109 16.171 8.11032 16.0303 7.96967C15.8897 7.82902 15.6989 7.75 15.5 7.75C15.3011 7.75 15.1103 7.82902 14.9697 7.96967C14.829 8.11032 14.75 8.30109 14.75 8.5C14.75 8.69891 14.829 8.88968 14.9697 9.03033C15.1103 9.17098 15.3011 9.25 15.5 9.25Z"
              />
            );
        }
      })()}
    </Icon>
  ),
);
