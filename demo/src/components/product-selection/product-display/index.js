import React from "react";
import { Flex, Image } from "@theme-ui/components";

import Spinner from "../../order-completer/spinner";
import Info from "./info";

const ProductDisplay = ({ product, region, showSpinner, sx }) => {
  return (
    <Flex sx={{ position: "relative", ...sx }}>
      {showSpinner && (
        <Flex
          sx={{
            position: "absolute",
            bg: "#ffffffaa",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </Flex>
      )}
      <Image
        sx={{
          height: ["150px", "200px"],
        }}
        src={product.thumbnail}
        alt={product.title}
      />
      <Info product={product} region={region} />
    </Flex>
  );
};

export default ProductDisplay;
