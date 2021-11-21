import { Card, Flex } from "@theme-ui/components";
import React, { useContext, useMemo } from "react";
import OrderContext from "../../context/order-context";
import OrderCompleter from "../order-completer";
import ProductSelection from "../product-selection";
import "./animations.css";


const Layout = ({ product, regions, country, regionId }) => {
  const { cart } = useContext(OrderContext);

  const selectedRegion = useMemo(() => {
    return regions.find((r) => r.id === regionId);
  }, [regions, regionId]);

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        pt: "2em",
      }}
    >
      <Card
        sx={{
          bg: "white",
          p: "24px",
          justifyContent: "center",
          transition: "all .2s linear",
        }}
      >
        {cart.items < 1 ? (
          <ProductSelection
            product={product}
            regions={regions}
            region={selectedRegion}
            country={country}
          />
        ) : (
          <OrderCompleter country={country} region={selectedRegion} />
        )}
      </Card>
      <Flex
        sx={{
          flexDirection: ["column", "row"],
          fontSize: "12px",
          color: "medusa80",
          bg: "#F0F0F0",
          width: "100%",
          py: "34px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex sx={{ mb: ["1rem", "0"] }}>

        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
