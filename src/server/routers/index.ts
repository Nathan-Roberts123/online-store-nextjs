import { z } from "zod";
import { procedure, router } from "../trpc";
import stripe from "@/utils/stripe/config";
import productRouter from "./product";

export const appRouter = router({
  createPaymentIntent: procedure
    .input(z.object({ amount: z.number() }))
    .mutation(async ({ input }) => {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: input.amount,
        automatic_payment_methods: { enabled: true },
      });
      return { clientSecret: paymentIntent.client_secret };
    }),
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
