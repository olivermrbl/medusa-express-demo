import React from "react";
import { Box } from "@theme-ui/components";

const Spinner = ({ done }) => {
  if (done) {
    return (
      <Box
        sx={{
          width: "64px",
          height: "64px",
        }}
      >
        <Box
          as="svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: "dash 5s linear forwards",
          }}
        >
          <path d="M11 32L24.4101 49L53 15" stroke="#454545" stroke-width="3" />
        </Box>
      </Box>
    );
  }

  const inside = {
    boxSizing: "border-box",
    display: "block",
    position: "absolute",
    width: "64px",
    height: "64px",
    margin: "8px",
    border: "3px solid #454545",
    borderRadius: "50%",
    animation: "lds-ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
    borderColor: "#454545 transparent transparent transparent",
    ":nth-child(1)": {
      animationDelay: "-0.45s",
    },
    ":nth-child(2)": {
      animationDelay: "-0.3s",
    },
    ":nth-child(3)": {
      animationDelay: "-0.15s",
    },
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        position: "relative",
        width: "80px",
        height: "80px",
      }}
    >
      <Box sx={inside} />
      <Box sx={inside} />
      <Box sx={inside} />
    </Box>
  );
};

export default Spinner;
