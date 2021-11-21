import React, { useState, useEffect } from "react";
import { Box, Select } from "@theme-ui/components";

import { states } from "../../../utils/states";

const StateSelect = ({
  country,
  formik,
  value,
  name,
  set,
  placeholder,
  sx,
}) => {
  if (!(country in states)) {
    return null;
  }

  return (
    <Select
      name={`${set}.${name}`}
      value={value}
      onChange={formik.handleChange}
      arrow={
        <Box
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="11"
          viewBox="0 0 10 10"
          fill="currentcolor"
          sx={{
            ml: -20,
            alignSelf: "center",
            pointerEvents: "none",
          }}
        >
          <path
            d="M4 7.75L1 4.83333M4 0.25V7.75V0.25ZM4 7.75L7 4.83333L4 7.75Z"
            stroke="#454545"
          />
        </Box>
      }
      sx={{
        height: "36px",
        border: "1px solid",
        borderColor: "#454545",
        transition: "all .2s linear",
        color: value ? "#454545" : "#999",
      }}
    >
      <option selected disabled value={null}>
        {placeholder}
      </option>
      {states[country].map((c) => {
        return (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        );
      })}
    </Select>
  );
};

export default StateSelect;
