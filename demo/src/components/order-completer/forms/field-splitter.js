import { Flex, Box } from "@theme-ui/components";
import React from "react";

const FieldSplitter = ({ left, mid, right }) => {
  return (
    <Flex
      sx={{
        width: "100%",
        flexGrow: "1",
      }}
    >
      <Box
        sx={{
          mr: ".30em",
          width: "100%",
        }}
      >
        {left}
      </Box>
      {mid && (
        <Box
          sx={{
            mx: ".30em",
            width: "100%",
          }}
        >
          {mid}
        </Box>
      )}
      <Box
        sx={{
          ml: ".30em",
          width: "100%",
        }}
      >
        {right}
      </Box>
    </Flex>
  );
};

export default FieldSplitter;
