import { procedure, router } from "../trpc";
import prisma from "@/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const ctxError: TRPCError = {
  name: "TRPCError",
  code: "BAD_REQUEST",
  message: "user id was not found: null | undefined",
};

const cartRouter = router({
  addToCart: procedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user.id || ctx.user.id === "undefined") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `user id is missing.`,
        });
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

      const cartProduct = await prisma.cartProduct.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: input.productId,
          },
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
        create: {
          quantity: 1,
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
        select: {
          quantity: true,
          product: true,
          productId: true,
          cartId: true,
        },
      });

      return cartProduct;
    }),

  getCartProducts: procedure.query(async ({ ctx }) => {
    if (!ctx) {
      throw ctxError;
    }
    const cart = await prisma.cart.findUnique({
      where: {
        userId: ctx.user.id,
      },
    });
    if (!cart) {
      return null;
    }
    const products = await prisma.cartProduct.findMany({
      where: {
        cartId: cart?.id,
      },
      select: {
        quantity: true,
        product: true,
        productId: true,
        cartId: true,
      },
    });

    return products;
  }),

  removeProduct: procedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw ctxError;
      }
      const cart = await prisma.cart.findUnique({
        where: {
          userId: ctx.user.id,
        },
      });
      const existingProduct = await prisma.cartProduct.findUnique({
        where: {
          cartId_productId: {
            cartId: cart?.id!,
            productId: input.productId,
          },
        },
      });

      if (!existingProduct) {
        return;
      }

      const cartProduct = await prisma.cartProduct.update({
        where: {
          cartId_productId: {
            cartId: cart?.id!,
            productId: input.productId,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
        select: {
          quantity: true,
          product: true,
          cartId: true,
          productId: true,
        },
      });

      if (cartProduct.quantity === 0) {
        const product = await prisma.cartProduct.delete({
          where: {
            cartId_productId: {
              cartId: cartProduct.cartId,
              productId: cartProduct.productId,
            },
          },
          select: {
            quantity: true,
            product: true,
            productId: true,
            cartId: true,
          },
        });
        return product;
      }

      return cartProduct;
    }),

  getTotalItems: procedure.query(async ({ ctx }) => {
    if (!ctx) {
      throw ctxError;
    }
    const cartProducts = await prisma.cart.findUnique({
      where: {
        userId: ctx.user.id,
      },
      select: {
        CartProduct: true,
      },
    });
    const products = cartProducts?.CartProduct;
    let total: number = 0;

    products?.forEach((prd) => {
      total += prd.quantity;
    });

    return total;
  }),
});

export default cartRouter;
