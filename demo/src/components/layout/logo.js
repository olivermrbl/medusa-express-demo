import { Box, Image } from "@theme-ui/components";
import React from "react";
import logo from "../../icons/logo.svg";

const Logo = ({ sx }) => {
  return (
    <Box
      as="svg"
      height="29"
      viewBox="0 0 135 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={sx}
    >
      <path
        d="M0 9.33898V0H23.1081V9.33898H17.027V29H6.32432V9.33898H0Z"
        fill="#EAEAEA"
      />
      <path
        d="M27 29V0H47.1892V8.11017H37.4595V10.5678H45.4865V18.4322H37.4595V20.8898H47.1892V29H27Z"
        fill="#EAEAEA"
      />
      <path
        d="M50.5946 29V0H61.2973V12.0424L66.8919 0H78.3243L70.5405 14.5L79.5405 29H68.1081L61.2973 16.7119V29H50.5946Z"
        fill="#EAEAEA"
      />
      <path
        d="M81.4865 29V0H92.4324V19.4153H101.189V29H81.4865Z"
        fill="#EAEAEA"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M103.378 29L113.108 0H125.27L135 29H124.541L123.081 24.0847H114.811L113.838 29H103.378ZM116.757 16.7119L118.946 8.84746L121.135 16.7119H116.757Z"
        fill="#EAEAEA"
      />
    </Box>
  );
};

export default Logo;
