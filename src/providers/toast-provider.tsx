"use client";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useReducer } from "react";
import { createContext } from "react";

export type actionType = {
  type: "open" | "close";
  message: string;
  variant: "success" | "error";
};

export type stateType = {
  open: boolean;
  message: string;
  variant: "success" | "error";
};

export const ToastContext = createContext<any>(null);
export const ToastDispatchContext = createContext<any>(null);

function reducer<stateType>(state: stateType, action: actionType) {
  if (action.type === "open") {
    return {
      open: true,
      message: action.message,
      variant: action.variant,
    };
  } else if (action.type === "close") {
    return {
      open: false,
      message: action.message,
      variant: action.variant,
    };
  }
  throw new Error("Unknown action");
}

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { open: false } as stateType);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "close", message: "error", variant: "success" });
  };

  return (
    <>
      <ToastContext.Provider value={state}>
        <ToastDispatchContext.Provider value={dispatch}>
          <Snackbar
            open={state.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              variant="filled"
              severity={state.variant === "success" ? "success" : "error"}
            >
              {state.message}
            </Alert>
          </Snackbar>
          {children}
        </ToastDispatchContext.Provider>
      </ToastContext.Provider>
    </>
  );
};

export default ToastProvider;
