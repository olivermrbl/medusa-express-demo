import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { Select, Box, Flex, Text } from "@theme-ui/components";
import OrderContext from "../../../context/order-context";
import { client } from "../../../utils/client";

const RegionSelector = ({ sx, selected, regions }) => {
  const handleChange = (e) => {
    const [_, countryOrHandle, handle] = window.location.pathname.split("/");

    if (!handle) {
      navigate(`/${e.target.value}/${countryOrHandle}`);
    } else {
      navigate(`/${e.target.value}/${handle}`);
    }
  };

  return (
    <Flex sx={sx}>
      <Text
        sx={{
          color: "#B0B0B0",
          mr: "1em",
        }}
      >
        Shipping to
      </Text>
      <Select
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
        onChange={handleChange}
        value={selected}
        sx={{
          borderColor: "#454545",
          maxWidth: "150px",
        }}
      >
        {regions.map((r, i) => {
          return r.countries.map((country) => {
            return (
              <option key={country.iso_2} value={country.iso_2}>
                {country.display_name}
              </option>
            );
          });
        })}
      </Select>
    </Flex>
  );
};

export default RegionSelector;
