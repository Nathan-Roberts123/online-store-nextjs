"use client";
import { createContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const StripeContext = createContext(stripePromise);

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StripeContext.Provider value={stripePromise}>
      {children}
    </StripeContext.Provider>
  );
};

export default StripeProvider;
