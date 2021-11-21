import React, { useContext, useEffect, useMemo } from "react";
import { Box, Text, Button, Flex } from "@theme-ui/components";

import OrderContext from "../../../context/order-context";
import { states } from "../../../utils/states";

import Field from "./field";
import SelectShipping from "./select-shipping";
import StateSelect from "./state-select";
import FieldSplitter from "./field-splitter";

const Delivery = ({ region, country, formik, isValid, setIsValid }) => {
  const { delivery } = useContext(OrderContext);

  const fullCountry = useMemo(
    () => region.countries.find((c) => c.iso_2 === country),
    [country, region]
  );

  useEffect(() => {
    formik.setFieldValue("delivery.country_code", country);
  }, country);

  return (
    <Box as="form">
      <Text
        as="h3"
        sx={{
          mb: "1em",
          fontSize: "1em",
        }}
      >
        Delivery to {fullCountry.display_name}
      </Text>
      {!isValid.delivery ? (
        <>
          <Field
            formik={formik}
            placeholder={"Address"}
            value={formik.values.delivery.address_1}
            name={"address_1"}
            set={"delivery"}
          />
          <FieldSplitter
            right={
              <Field
                formik={formik}
                placeholder={"City"}
                value={formik.values.delivery.city}
                name={"city"}
                set={"delivery"}
              />
            }
            mid={
              country in states ? (
                <StateSelect
                  country={country}
                  formik={formik}
                  placeholder={"State/Region"}
                  value={formik.values.delivery.province}
                  name={"province"}
                  set={"delivery"}
                />
              ) : null
            }
            left={
              <Field
                formik={formik}
                placeholder={"Postal Code"}
                value={formik.values.delivery.postal_code}
                name={"postal_code"}
                set={"delivery"}
              />
            }
          />
          <input hidden readOnly name="delivery.country_code" value={country} />
          <SelectShipping
            formik={formik}
            region={region}
            placeholder={"Select shipping method"}
            value={formik.values.delivery.shipping_option}
            name={"shipping_option"}
            set={"delivery"}
          />
        </>
      ) : (
        <Flex
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              fontSize: ".8em",
            }}
          >
            <Text variant="summary">{delivery.address_1}</Text>
            <Text variant="summary">{`${delivery.postal_code}, ${delivery.city}`}</Text>
            <Text variant="summary">{delivery.country_code.toUpperCase()}</Text>
          </Flex>
          <Button
            sx={{
              bg: "transparent",
              color: "primary",
              textDecoration: "underline",
              cursor: "pointer",
              padding: "0",
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsValid({ ...isValid, delivery: false });
            }}
          >
            Edit
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Delivery;
