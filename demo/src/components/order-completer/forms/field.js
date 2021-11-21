import React, { useEffect, useState } from "react";
import { Input, Flex } from "@theme-ui/components";

const Field = ({ formik, value, name, set, placeholder }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (formik.errors[set]?.[name] && formik.touched[set]?.[name]) {
      setError(true);
    } else {
      setError(false);
    }
  }, [formik.errors]);
  return (
    <Flex
      sx={{
        flexDirection: "column",
        mb: ".75em",
        width: "100%",
      }}
    >
      <Input
        defaultValue={value}
        name={`${set}.${name}`}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder={placeholder}
        sx={{
          outlineColor: "#000",
          borderRadius: "0",
          border: "1px solid",
          borderColor: error ? "salmon" : "#454545",
          transition: "all .2s linear",
        }}
      />
    </Flex>
  );
};

export default Field;
