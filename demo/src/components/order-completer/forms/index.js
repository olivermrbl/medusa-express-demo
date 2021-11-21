import { Box, Button } from "@theme-ui/components";
import React, { useContext, useState } from "react";
import Contact from "./contact";
import Delivery from "./delivery";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrderContext from "../../../context/order-context";

import Payment from "../payment";

const Forms = ({ country, region }) => {
  const { contact, delivery, setDelivery, setContact, setDetails } =
    useContext(OrderContext);

  const [isValid, setIsValid] = useState({
    contact: false,
    delivery: false,
  });
  const formik = useFormik({
    initialValues: {
      contact: {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
      },
      delivery: {
        address_1: delivery.address_1,
        postal_code: delivery.postal_code,
        city: delivery.city,
        province: delivery.province,
        country_code: delivery.country_code,
        shipping_option: delivery.shipping_option,
      },
    },
    validationSchema: Yup.object({
      contact: Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string()
          .email("Please provide a valid email address")
          .required("Required"),
        phone: Yup.string().optional(),
      }),
      delivery: Yup.object({
        address_1: Yup.string().required("Required"),
        postal_code: Yup.string().required("Required"),
        province: Yup.string(),
        city: Yup.string().required("Required"),
        country_code: Yup.string().required("Required"),
        shipping_option: Yup.string().required("Required"),
      }),
    }),
    onSubmit: async (values) => {
      setIsValid({ delivery: true, contact: true });
      setDelivery(values.delivery);
      setContact(values.contact);
      return await setDetails(values.contact, values.delivery);
    },
  });

  return (
    <Box>
      <Contact formik={formik} isValid={isValid} setIsValid={setIsValid} />
      <Box
        sx={{
          height: "1px",
          bg: "cool",
          width: "100%",
          my: "1em",
        }}
      />
      <Delivery
        region={region}
        country={country}
        formik={formik}
        isValid={isValid}
        setIsValid={setIsValid}
      />
      <Box
        sx={{
          height: "1px",
          bg: "cool",
          width: "100%",
          my: "1em",
        }}
      />
      {isValid.delivery && isValid.contact ? (
        <Payment />
      ) : (
        <Button
          onClick={(e) => {
            e.preventDefault();
            formik.submitForm();
          }}
          sx={{
            cursor: "pointer",
            borderRadius: 0,
            bg: "#454545",
            "&:hover": {
              bg: "#000",
            },
            width: "100%",
            minWidth: ["", "500px"],
            fontFamily: "Helvetica Neue",
            fontWeight: 300,
            fontSize: "16px",
          }}
        >
          Go to payment
        </Button>
      )}
    </Box>
  );
};

export default Forms;
