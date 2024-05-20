import React from "react";
import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  const { className } = props;

  return (
    <input
      className={cn(
        "input w-full h-[49px] rounded-md border border-gray6 px-6 text-base",
        className
      )}
      {...props}
    />
  );
};

export default Input;
