import React from "react";

const FeildErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className="mt-2 text-sm text-red">{children}</p>;
};

export default FeildErrorMessage;
