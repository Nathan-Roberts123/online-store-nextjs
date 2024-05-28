"use client";
import CheckoutForm from "./components/checkout-form";
import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { StripeContext } from "@/providers/stripe-provider";
import OrderSummary from "./components/order-summary";
import { CartContext } from "@/providers/cart-provider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Checkout() {
  const { data: session } = useSession();
  const stripePromise = useContext(StripeContext);

  const clientSecretMutation = trpc.createPaymentIntent.useMutation();
  const data = useContext(CartContext);

  let totalPrice = 0;
  let quantity = 0;

  data.length &&
    data.forEach((item) => {
      const prdPrice = item.product.price * item.quantity;
      totalPrice += prdPrice;
    });

  data.forEach((item) => {
    quantity += item.quantity;
  });

  const totalPriceCents = totalPrice * 100;

  useEffect(() => {
    if (totalPriceCents > 50) {
      clientSecretMutation.mutate({
        amount: totalPriceCents,
        cartId: data[0].cartId,
        quantity: quantity,
        email: session!.user.email!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPriceCents]);

  if (!session) {
    return redirect("/auth/signin");
  }

  if (!clientSecretMutation.data) {
    return;
  }

  return (
    <>
      {clientSecretMutation.data.clientSecret && stripePromise && (
        <div className="md:flex justify-center py-6 items-center gap-52">
          <OrderSummary totalPrice={totalPrice} data={data} />
          <div className="px-4 mt-4 md:mt-0">
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: clientSecretMutation.data.clientSecret }}
            >
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      )}
    </>
  );
}
