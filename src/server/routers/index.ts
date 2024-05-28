import { z } from "zod";
import { procedure, router } from "../trpc";
import stripe from "@/utils/stripe/config";
import productRouter from "./product";
import { userRouter } from "./user";
import orderRouter from "./order";
import cartRouter from "./cart";

export const appRouter = router({
  createPaymentIntent: procedure
    .input(
      z.object({
        amount: z.number(),
        cartId: z.string(),
        quantity: z.number(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: input.amount,
        automatic_payment_methods: { enabled: true },
        metadata: {
          cartId: input.cartId,
          quantity: input.quantity,
          email: input.email,
        },
      });

      return { clientSecret: paymentIntent.client_secret };
    }),
  product: productRouter,
  user: userRouter,
  order: orderRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
