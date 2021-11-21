import { Flex, Text } from "@theme-ui/components";
import React from "react";
import { getFrom } from "../../../utils/get-from";
import OptionSelector from "./option-selector";

const Info = ({ product, region }) => {
  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        ml: "3em",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Text
          sx={{
            fontSize: ".75em",
            mb: "1em",
          }}
        >
          <Text sx={{ color: "#B0B0B0", mr: "1em" }}>From</Text>
          <Text
            sx={{
              fontWeight: "500",
            }}
          >
            {getFrom(product.variants, {
              currency_code: region.currency_code,
              tax_rate: region.tax_rate,
            })}{" "}
            {region.currency_code.toUpperCase()}
          </Text>
        </Text>
        <Text
          sx={{
            fontSize: ".75em",
            mb: "1em",
          }}
        >
          {product.description}
        </Text>
        <Text
          sx={{
            fontSize: ".75em",
            mb: "1em",
          }}
        >
          <Text sx={{ color: "#B0B0B0", mr: "1em" }}>Quantity</Text>
          <Text
            sx={{
              fontWeight: "500",
            }}
          >
            1
          </Text>
        </Text>
        <OptionSelector product={product} />
      </Flex>
    </Flex>
  );
};

export default Info;
