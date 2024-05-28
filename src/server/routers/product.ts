import { procedure, router } from "../trpc";
import prisma from "@/db";
import { env } from "@/env";
import { ZFProuct } from "@/types";
import { s3 } from "@/utils/s3/config";
import { v4 as uuidv4 } from "uuid";
import { createPresignedUrlWithClient } from "@/utils/s3/utils";
import { z } from "zod";

const productRouter = router({
  getProducts: procedure.query(() => {
    const products = prisma.product.findMany();
    return products;
  }),

  getProduct: procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const product = prisma.product.findUnique({
        where: {
          id: input.id,
        },
      });
      return product;
    }),

  createProduct: procedure.input(ZFProuct).mutation(async ({ input }) => {
    const signedUrl = await createPresignedUrlWithClient(
      s3,
      env.AWS_BUCKET_NAME,
      uuidv4()
    );

    if (typeof input.image === "object") {
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
    }

    const product = prisma.product.create({
      data: {
        ...input,
        image: signedUrl.split("?")[0],
      },
    });
    return product;
  }),

  deleteProduct: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const product = await prisma.product.delete({
        where: {
          id: input.id,
        },
      });
      return product;
    }),

  updateProduct: procedure.input(ZFProuct).mutation(async ({ input }) => {
    let signedUrl: string | null = null;
    if (typeof input.image == "object") {
      if (input.image.size) {
        signedUrl = await createPresignedUrlWithClient(
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
      }
    }

    const product = prisma.product.update({
      where: {
        id: input.id,
      },
      data: !!signedUrl
        ? {
            ...input,
            image: signedUrl.split("?")[0],
          }
        : {
            name: input.name,
            quantity: input.quantity,
            price: input.price,
            suk: input.suk,
            status: input.status,
          },
    });
    return product;
  }),
});

export default productRouter;
