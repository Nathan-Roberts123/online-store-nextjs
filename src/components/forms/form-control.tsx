import React from "react";

interface FormControlProps {
  children: React.ReactNode;
}

const FormControl = (props: FormControlProps) => {
  const { children } = props;
  return <div className="mb-5">{children}</div>;
};

export default FormControl;
