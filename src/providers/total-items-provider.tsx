"use client";
import React, { useEffect } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { trpc } from "@/utils/trpc";

export const TotalItemsContext = createContext(0);
export const TotalItemsDispatchContext = createContext(
  (action: cartActionType) => {}
);

type cartActionType = {
  type: "incrementCart" | "decrementCart";
  value: number;
};

function totalItemsReducer(totalItem: number, action: cartActionType) {
  switch (action.type) {
    case "incrementCart": {
      const value = (totalItem += action.value);
      return value;
    }
    case "decrementCart": {
      return (totalItem -= action.value);
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

const TotalItemsProviderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const query = trpc.cart.getTotalItems.useQuery();

  const [totalValue, dispatch] = useReducer(totalItemsReducer, 0);

  useEffect(() => {
    if (query.data) {
      if (!(query.data === totalValue)) {
        dispatch({
          type: "incrementCart",
          value: query.data,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);

  return (
    <TotalItemsContext.Provider value={totalValue}>
      <TotalItemsDispatchContext.Provider value={dispatch}>
        {children}
      </TotalItemsDispatchContext.Provider>
    </TotalItemsContext.Provider>
  );
};

export default TotalItemsProviderProvider;
