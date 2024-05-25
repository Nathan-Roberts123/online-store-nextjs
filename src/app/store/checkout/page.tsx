"use client";
import CheckoutForm from "@/components/checkout-form";
import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { StripeContext } from "@/providers/stripe-provider";

export default function Checkout() {
  const stripePromise = useContext(StripeContext);

  const clientSecretMutation = trpc.createPaymentIntent.useMutation();

  useEffect(() => {
    clientSecretMutation.mutate({ amount: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!clientSecretMutation.data) {
    return;
  }

  return (
    <>
      {clientSecretMutation.data.clientSecret && stripePromise && (
        <div className="flex justify-center py-6">
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecretMutation.data.clientSecret }}
          >
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </>
  );
}
