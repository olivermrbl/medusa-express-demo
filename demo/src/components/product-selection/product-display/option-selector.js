import { Box, Flex, Select } from "@theme-ui/components";
import React, { useContext, useEffect, useMemo, useState } from "react";
import OrderContext from "../../../context/order-context";

const OptionSelector = ({ product }) => {
  const { selectVariant } = useContext(OrderContext);
  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState(JSON.stringify({}));

  useEffect(() => {
    const opts = [];
    for (const option of product.options) {
      const opt = {
        title: option.title,
        id: option.id,
        values: [...new Set(option.values.map((v) => v.value))],
      };
      opts.push(opt);
    }
    setOptions(opts);

    const select = {};
    for (const opt of opts) {
      select[opt.id] = opt.values[0];
    }
    setSelection(JSON.stringify(select));
  }, [product]);

  const handleSelect = (e) => {
    const pair = JSON.parse(e.target.value);
    const tmp = JSON.parse(selection);
    tmp[pair.option] = pair.value;
    setSelection(JSON.stringify(tmp));
  };

  const createVariantSet = (options, variants) => {
    const set = [];
    for (const variant of variants) {
      const optionSet = {};
      if (variant?.options) {
        for (const option of variant.options) {
          const { id } = options.find((o) => o.id === option.option_id);
          optionSet[id] = option.value;
        }
      }
      optionSet["variant"] = variant;
      set.push(optionSet);
    }
    return set;
  };

  const variantSet = useMemo(() => {
    if (product?.options && product?.variants) {
      return createVariantSet(product.options, product.variants);
    } else {
      return [];
    }
  }, [product]);

  useEffect(() => {
    const select = JSON.parse(selection);
    for (const variant of variantSet) {
      const keys = Object.keys(variant).filter((k) => k !== "variant");
      let count = 0;
      for (const key of keys) {
        count = select[key] === variant[key] ? count + 1 : 0;
      }

      if (count === keys.length) {
        selectVariant(variant.variant);
      }
    }
  }, [selection]);

  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      {options.map((o, i) => {
        return (
          <Flex
            key={i}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              pt: "1em",
            }}
          >
            <Select
              sx={{
                minWidth: "170px",
                outlineColor: "black",
              }}
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
              onChange={handleSelect}
            >
              <option value="" disabled selected>
                Select {o.title}
              </option>
              {o.values.map((v, i) => {
                return (
                  <option
                    key={i}
                    value={JSON.stringify({ option: o.id, value: v })}
                  >
                    {v}
                  </option>
                );
              })}
            </Select>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default OptionSelector;
