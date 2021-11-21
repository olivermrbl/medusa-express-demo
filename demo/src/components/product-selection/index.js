import { Button, Flex, Text } from "@theme-ui/components";
import React, { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/order-context";
import { client } from "../../utils/client";
import { formatVariantPrice } from "../../utils/variant-price";
import BreadCrumbs from "./bread-crumbs";
import ProductDisplay from "./product-display";
import RegionSelector from "./region-selector";



const ProductSelection = ({ product, region, regions, country }) => {
  const { createCart, status, variant } = useContext(OrderContext);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    client.products.retrieve(product.id).then(({ product: details }) => {
      const inventoryObj = details.variants.reduce((acc, next) => {
        acc[next.id] = next.inventory_quantity;
        return acc;
      }, {});

      setInventory(inventoryObj);
    });
  }, [product]);

  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Flex>
      </Flex>
      <Flex
        sx={{
          flexDirection: ["column-reverse", "row"],
          py: "8px",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BreadCrumbs
          sx={{
            my: ["1em", ""],
            width: "100%",
            alignItems: "center",
            flex: 1,
          }}
        />
        <RegionSelector
          selected={country}
          regions={regions}
          sx={{
            flex: 1,
            my: ["1em", ""],
            width: "100%",
            alignItems: "center",
            justifyContent: ["space-between", "flex-end"],
          }}
        />
      </Flex>
      <Flex
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          py: "8px",
        }}
      >
        <Text
          sx={{
            fontFamily: "Helvetica Neue",
            fontStyle: "normal",
            fontWeight: "300",
            fontSize: "18px",
            lineHeight: "120%",
          }}
        >
          {product.title}
        </Text>
      </Flex>
      <ProductDisplay
        showSpinner={status === "creating_cart"}
        product={product}
        region={region}
        inventory={inventory}
        sx={{
          py: "12px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      />
      <Flex sx={{ py: "16px", width: "100%", justifyContent: "space-between" }}>
        <Text>Total</Text>
        <Text>{formatVariantPrice(variant, region)}</Text>
      </Flex>
      <hr />
      <Button
        disabled={status === "creating_cart"}
        sx={{
          cursor: "pointer",
          width: ["100%", "580px"],
          height: "40px",
          background: "#454545",
          "&:hover": {
            bg: "#000",
          },
          borderRadius: "0",
          padding: "8px 56px",
          fontFamily: "Helvetica Neue",
          fontWeight: 300,
          fontSize: "16px",
          "&:disabled": {
            opacity: 0.5,
            "&:hover": {
              bg: "#454545",
            },
          },
        }}
        onClick={() => createCart(region.id, country)}
      >
        Buy now
      </Button>
    </Flex>
  );
};

export default ProductSelection;
