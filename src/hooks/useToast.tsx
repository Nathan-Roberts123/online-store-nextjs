"use client";
import { ToastDispatchContext, actionType } from "@/providers/toast-provider";
import { useContext } from "react";

const useToast = () => {
  const dispatch = useContext(ToastDispatchContext);
  return (params: actionType) => dispatch(params);
};

export default useToast;
