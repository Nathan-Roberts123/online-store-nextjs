"use client";
import React, { createContext, useReducer, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { cartItem } from "@/types";
import { CircularProgress } from "@mui/material";

export const CartContext = createContext([] as cartItem[]);
export const CartDispatchContext = createContext(
  (action: cartActionType) => {}
);

type cartActionType = {
  type: "addProduct" | "removeProduct" | "updateCart";
  value?: cartItem;
  updatedValues?: cartItem[];
};

function cartReducer(cart: cartItem[], action: cartActionType) {
  switch (action.type) {
    case "addProduct": {
      const product = cart.filter((item) => {
        if (
          item.cartId === action.value?.cartId &&
          item.productId === action.value.productId
        ) {
          return item;
        }
      });

      if (product[0]) {
        const updatedCart = cart.map((item) => {
          if (
            item.productId === action.value?.productId &&
            item.cartId === action.value.cartId
          ) {
            return { ...action.value, quantity: item.quantity + 1 };
          }
          return item;
        });
        return updatedCart;
      }
      return [...cart, action.value]! as cartItem[];
    }
    case "removeProduct": {
      const updatedCart = cart.map((item) => {
        if (
          item.productId === action.value?.productId &&
          item.cartId === action.value.cartId
        ) {
          return { ...action.value, quantity: item.quantity - 1 };
        }
        return item;
      });

      const filtered = updatedCart.filter((item) => {
        if (!(item.quantity === 0)) {
          return item;
        }
      });
      return filtered;
    }
    case "updateCart": {
      return action.updatedValues!;
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

const CartProvier = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = trpc.cart.getCartProducts.useQuery();
  const [cart, dispatch] = useReducer(cartReducer, [] as cartItem[]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "updateCart",
        updatedValues: data,
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvier;
