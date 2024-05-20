import { procedure, router } from "../trpc";
import prisma from "@/db";

const productRouter = router({
  getProducts: procedure.query(() => {
    return;
  }),
});

export default productRouter;
