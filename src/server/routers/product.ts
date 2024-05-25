import { procedure, router } from "../trpc";
import prisma from "@/db";
import { env } from "@/env";
import { ZFProuct } from "@/types";
import { s3 } from "@/utils/s3/config";
import { v4 as uuidv4 } from "uuid";
import { createPresignedUrlWithClient } from "@/utils/s3/utils";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const ctxError: TRPCError = {
  name: "TRPCError",
  code: "BAD_REQUEST",
  message: "user id was not found: null | undefined",
};

const productRouter = router({
  getProducts: procedure.query(() => {
    const products = prisma.product.findMany();
    return products;
  }),

  createProduct: procedure.input(ZFProuct).mutation(async ({ input }) => {
    const signedUrl = await createPresignedUrlWithClient(
      s3,
      env.AWS_BUCKET_NAME,
      uuidv4()
    );

    const res = await fetch(signedUrl, {
      method: "PUT",
      body: input.image,
      headers: {
        "Content-Type": input.image.type,
      },
    });

    if (!res.ok) {
      throw new Error("Could not PUT file in S3 Bucket");
    }

    const product = prisma.product.create({
      data: {
        ...input,
        image: signedUrl.split("?")[0],
      },
    });
    return product;
  }),

  addToCart: procedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user.id) {
        throw ctx;
      }
      let cart = await prisma.cart.findUnique({
        where: {
          userId: ctx.user.id,
        },
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            User: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        });
      }

      const cartProduct = await prisma.cartProduct.create({
        data: {
          cart: {
            connect: {
              id: cart.id,
            },
          },
          product: {
            connect: {
              id: input.productId,
            },
          },
        },
      });

      return cartProduct;
    }),

  getCartTotal: procedure.query(async ({ ctx }) => {
    if (!ctx) {
      throw ctxError;
    }
    const cart = await prisma.cart.findUnique({
      where: {
        userId: ctx.user.id,
      },
    });
    const products = await prisma.cartProduct.findMany({
      where: {
        cartId: cart?.id,
      },
    });

    return { total: products.length };
  }),
});

export default productRouter;
