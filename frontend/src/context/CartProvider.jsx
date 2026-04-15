import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {

    case "add": {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "remove": {
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item._id !== action.payload
        ),
      };
    }

    case "decrease": {
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case "clear_cart":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;