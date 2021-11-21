import React, { useMemo, useContext, useState, useEffect } from "react";
import { Flex, Text, Box, Select } from "@theme-ui/components";

import OrderContext from "../../../context/order-context";
import { formatMoney } from "../../../utils/format-money";

const ShippingOption = ({ selected, option, region, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: "12px",
        border: "1px solid #454545",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        p: "12px",
        ":not(:first-of-type)": {
          borderLeft: "none",
        },
      }}
      value={option.id}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "12px",
            height: "12px",
            bg: "#454545",
            borderRadius: "50%",
          }}
        >
          {selected && (
            <Box
              sx={{
                width: "6px",
                height: "6px",
                bg: "white",
                borderRadius: "50%",
              }}
            />
          )}
        </Flex>
        <Text sx={{ mx: "1rem" }}>{option.name}</Text>
      </Flex>
      <Text>
        {formatMoney(
          {
            currency_code: region.currency_code.toUpperCase(),
            amount: option.amount,
          },
          2,
          region.tax_rate
        )}
      </Text>
    </Flex>
  );
};

const SelectShipping = ({ region, formik, value, name, set, placeholder }) => {
  const { shipping } = useContext(OrderContext);
  const [error, setError] = useState(false);

  const cleanShipping = useMemo(
    () => shipping.filter((s) => !s.data.require_drop_point),
    [shipping]
  );

  useEffect(() => {
    if (formik.errors[set]?.[name] && formik.touched[set]?.[name]) {
      setError(true);
    } else {
      setError(false);
    }
  }, [formik.errors]);

  useEffect(() => {
    if (cleanShipping.length === 1) {
      formik.setFieldValue(`${set}.${name}`, cleanShipping[0].id);
    }
  }, [cleanShipping]);

  const handleClick = (id) => {
    formik.setFieldValue(`${set}.${name}`, id);
  };

  return (
    <Flex
      sx={{
        width: "100%",
        mb: ".75em",
      }}
    >
      {cleanShipping.map((s) => {
        return (
          <ShippingOption
            key={s.id}
            onClick={() => handleClick(s.id)}
            selected={value === s.id}
            option={s}
            region={region}
          />
        );
      })}
    </Flex>
  );
};

export default SelectShipping;
