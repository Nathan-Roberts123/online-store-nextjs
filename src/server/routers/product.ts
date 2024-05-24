import { procedure, router } from "../trpc";
import prisma from "@/db";
import { env } from "@/env";
import { ZFProuct } from "@/type";
import { s3 } from "@/utils/s3/config";
import { v4 as uuidv4 } from "uuid";
import { createPresignedUrlWithClient } from "@/utils/s3/utils";

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
});

export default productRouter;
