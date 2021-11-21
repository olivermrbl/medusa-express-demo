import { Card, Flex } from "@theme-ui/components";
import React, { useEffect, useState } from "react";
import { client } from "../../utils/client";
import OrderConfirmation from "../order-completer/order-confirmation";




const Layout = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");
    client.orders.retrieve(id).then(({ order: res }) => setOrder(res));
  }, []);

  if (!order) {
    return null;
  }

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
        <OrderConfirmation order={order} />
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
