import * as React from "react";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/components";
import { Text } from "@react-email/components";

export function Email() {
  return (
    <Html lang="en">
      <Heading as="h2">Thank you for shoping on BlueShop.com</Heading>
      <Text>Your order will be processed immediately</Text>
    </Html>
  );
}
