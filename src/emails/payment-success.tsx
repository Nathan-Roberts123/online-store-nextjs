import * as React from "react";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/components";

export function Email() {
  return (
    <Html lang="en">
      <Heading as="h2">Lorem ipsum</Heading>;
    </Html>
  );
}
