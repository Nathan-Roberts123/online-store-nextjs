import React from "react";

const FieldLabel = ({
  children,
  required = true,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => {
  return (
    <p className="text-base text-black">
      {children} <span className="text-red">{required && "*"}</span>
    </p>
  );
};

export default FieldLabel;
