import React from "react";
import { Box } from "@chakra-ui/react";

export default function Disclaimer({ ...props }) {
  return (
    <Box
      color="gray.500"
      fontSize="14px"
      margin="0 auto"
      textAlign="center"
      {...props}
    />
  );
}
