import { Box, Flex, Text } from "@theme-ui/components";
import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/order-context";
import { formatMoney } from "../../utils/format-money";
import BreadCrumbs from "../product-selection/bread-crumbs";
import Forms from "./forms";
import OrderConfirmation from "./order-confirmation";
import Spinner from "./spinner";




const OrderCompleter = ({ country, region }) => {
  const { cart, order, orderStatus } = useContext(OrderContext);

  const [showSpinner, setShowSpinner] = useState(false);
  const [done, setDone] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (orderStatus === "completing") {
      setShowSpinner(true);
    } else if (orderStatus === "completed") {
      setDone(true);

      const timeout = setTimeout(() => {
        setShouldNavigate(true);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    } else if (orderStatus === "completion_failed") {
      setShowSpinner(false);
    } else {
      setShowSpinner(false);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (shouldNavigate && order?.id) {
      navigate(`/completed?id=${order.id}`);
    }
  }, [order?.id, shouldNavigate]);

  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex sx={{ fontSize: "14px" }}>
          <Text sx={{ mr: "1rem", color: "medusa80" }}>Total</Text>
          <Text>
            {formatMoney({
              amount: cart.total,
              currency_code: region.currency_code,
            })}
          </Text>
        </Flex>
      </Flex>
      {showSpinner ? (
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minWidth: ["200px", "500px"],
            height: "100%",
            minHeight: ["150px", "200px"],
          }}
        >
          <Spinner done={done} />
        </Flex>
      ) : order ? (
        <OrderConfirmation order={order} />
      ) : (
        <>
          <Flex>
            <BreadCrumbs step={1} sx={{ flex: 1, my: "1rem" }} />
            <Box sx={{ flex: 1 }} />
          </Flex>
          <Forms region={region} country={country} />
        </>
      )}
    </Flex>
  );
};

export default OrderCompleter;
