"use client";
import { StripeContext } from "@/providers/stripe-provider";
import React, { useContext, useEffect, useState } from "react";

const Success = () => {
  const [messageBody, setMessageBody] = useState<string | null | JSX.Element>(
    null
  );

  const stripePromise = useContext(StripeContext);

  useEffect(() => {
    stripePromise.then(async (stripe) => {
      if (!stripe) {
        return;
      }

      const url = new URL(window.location.href);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");
      if (!clientSecret) {
        return;
      }
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      if (!paymentIntent) {
        return;
      }

      setMessageBody(
        error ? (
          `> ${error}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{" "}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {paymentIntent.id}
            </a>
          </>
        )
      );
    });
  }, [stripePromise]);

  return (
    <>
      <h1>Thank you for shoping!</h1>
      <a href="/">home</a>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div>
    </>
  );
};

export default Success;
