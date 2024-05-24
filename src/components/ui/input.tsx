import React from "react";
import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { className, isInvalid, ...rest } = props;
    return (
      <input
        className={cn(
          `input w-full h-[49px] rounded-md border border-gray6 px-6 text-base ${
            isInvalid && "border-red-700"
          }`,
          className
        )}
        {...rest}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
