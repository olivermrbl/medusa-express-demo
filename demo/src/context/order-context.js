import React, { useEffect, useReducer } from "react";
import { client } from "../utils/client";


const actions = {
  SET_ORDER: "SET_ORDER",
  SET_CART: "SET_CART",
  CREATE_CART: "CREATE_CART",
  DESTROY_CART: "DESTROY_CART",
  SET_REGION: "SET_REGION",
  SET_VARIANT: "SET_VARIANT",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  SET_CONTACT: "SET_CONTACT",
  CLEAR_CONTACT: "CLEAR_CONTACT",
  SET_DELIVERY: "SET_DELIVERY",
  SET_SHIPPING: "SET_SHIPPING",
  SET_ORDER_STATUS: "SET_ORDER_STATUS",
  SET_STATUS: "SET_STATUS",
};

export const defaultOrderContext = {
  status: "pending",
  orderStatus: "pending",
  selectedRegion: {
    tax_rate: 0,
    currency_code: "",
  },
  variant: null,
  quantity: 1,
  cart: {
    items: [],
  },
  contact: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  },
  delivery: {
    address_1: "",
    postal_code: "",
    city: "",
    province: "",
    country_code: "",
    shipping_option: "",
  },
  order: null,
  shipping: [],
  selectRegion: () => {},
  selectVariant: () => {},
  updateQuantity: () => {},
  createCart: async () => {},
  setContact: () => {},
  clearContact: () => {},
  setDelivery: () => {},
  dispatch: () => {},
};

const OrderContext = React.createContext(defaultOrderContext);
export default OrderContext;

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case actions.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case actions.SET_ORDER_STATUS:
      return {
        ...state,
        orderStatus: action.payload,
      };
    case actions.DESTROY_CART:
      return {
        ...state,
        cart: {
          items: [],
        },
      };
    case actions.SET_REGION:
      return {
        ...state,
        selectedRegion: action.payload,
      };
    case actions.UPDATE_QUANTITY:
      return {
        ...state,
        quantity: action.payload,
      };
    case actions.SET_VARIANT:
      return {
        ...state,
        variant: action.payload,
      };
    case actions.SET_CONTACT:
      return {
        ...state,
        contact: action.payload,
      };
    case actions.CLEAR_CONTACT:
      return {
        ...state,
        contact: {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
        },
      };
    case actions.SET_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
      };
    case actions.SET_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case actions.SET_CART:
      if (localStorage) {
        localStorage.setItem("cart_id", action.payload.id);
      }
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultOrderContext);

  useEffect(() => {
    const fetchOptions = async () => {
      if (state.cart.id) {
        const options = await client.shippingOptions
          .listCartOptions(state.cart.id)
          .then(({ shipping_options }) => shipping_options);
        dispatch({ type: actions.SET_SHIPPING, payload: options });
      }
    };
    fetchOptions();
  }, [state.cart.id]);

  const completeOrder = async () => {
    if (state.cart && state.cart.id) {
      dispatch({ type: actions.SET_ORDER_STATUS, payload: "completing" });

      try {
        await client.carts.setPaymentSession(state.cart.id, {
          provider_id: "stripe",
        });

        return await client.carts
          .complete(state.cart.id)
          .then(({ data, type }) => {
            dispatch({ type: actions.SET_ORDER_STATUS, payload: "completed" });
            if (type === "order") {
              dispatch({ type: actions.SET_ORDER, payload: data });
            }
          });
      } catch (err) {
        dispatch({
          type: actions.SET_ORDER_STATUS,
          payload: "completion_failed",
        });
      }
    }
  };

  const setDetails = async (contact, delivery) => {
    return await client.carts
      .update(state.cart.id, {
        email: contact.email,
        shipping_address: {
          first_name: contact.first_name,
          last_name: contact.last_name,
          address_1: delivery.address_1,
          country_code: delivery.country_code,
          postal_code: delivery.postal_code,
          province: delivery.province,
          city: delivery.city,
          phone: contact.phone,
        },
      })
      .then(({ cart }) => {
        dispatch({ type: actions.SET_CART, payload: cart });
        return cart;
      });
  };

  const selectRegion = (region) => {
    dispatch({ type: actions.SET_REGION, payload: region });
  };

  const selectVariant = (id) => {
    dispatch({ type: actions.SET_VARIANT, payload: id });
  };

  const updateQuantity = (quantity) => {
    dispatch({ type: actions.UPDATE_QUANTITY, payload: quantity });
  };

  const createCart = async (region, countryCode) => {
    const { variant, quantity } = state
    if (variant.id) {
      dispatch({ type: actions.SET_STATUS, payload: "creating_cart" });
      const { id } = await client.carts
        .create({
          region_id: region,
          country_code: countryCode,
        })
        .then(({ cart }) => cart);

      await client.carts.lineItems.create(id, {
        variant_id: variant.id,
        quantity: quantity,
      });

      const cart = await client.carts
        .createPaymentSessions(id)
        .then(({ cart }) => cart);

      dispatch({ type: actions.SET_STATUS, payload: "cart_created" });

      dispatch({ type: actions.SET_CART, payload: cart });
    }
  };

  const setContact = (contact) => {
    dispatch({ type: actions.SET_CONTACT, payload: contact });
  };

  const setDelivery = (delivery) => {
    dispatch({ type: actions.SET_DELIVERY, payload: delivery });
  };

  const clearContact = () => {
    dispatch({ type: actions.CLEAR_CONTACT });
  };

  const destroyCart = () => {
    dispatch({ type: actions.DESTROY_CART });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        setDetails,
        completeOrder,
        destroyCart,
        clearContact,
        setContact,
        setDelivery,
        createCart,
        selectRegion,
        selectVariant,
        updateQuantity,
        dispatch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
