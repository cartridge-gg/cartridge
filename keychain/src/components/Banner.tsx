import React from "react";
import { Box, Heading, useStyleConfig, StyleProps } from "@chakra-ui/react";

const Banner = ({
  title,
  variant,
  children,
  ...rest
}: StyleProps & {
  title: string;
  variant?: any;
  children: React.ReactNode;
}) => {
  const styles = useStyleConfig("Banner", { variant });
  return (
    <Box __css={styles} textAlign={"center"} {...rest}>
      <Heading fontSize="14px" textStyle="heading">
        {title}
      </Heading>
      <Box mt={3} fontSize="12px" color="#888">
        {children}
      </Box>
    </Box>
  );
};

export default Banner;
