import React, { useContext, useEffect, useState } from "react";
import OrderContext from "../../../context/order-context";
import { Text } from "@theme-ui/components";
import { formatMoney } from "../../../utils/format-money";

const Price = ({ prices, region }) => {
  const [moneyAmount, setMoneyAmount] = useState(null);

  useEffect(() => {
    const price = prices.find((p) => p.currency_code === region.currency_code);
    setMoneyAmount(price);
  }, [prices, region]);

  const formattedPrice = moneyAmount
    ? formatMoney(
        { amount: moneyAmount.amount, currencyCode: moneyAmount.currency_code },
        2,
        region.tax_rate
      )
    : null;

  return (
    <Text
      sx={{
        fontSize: "1.2em",
        fontWeight: "500",
      }}
    >
      {formattedPrice}
    </Text>
  );
};

export default Price;
