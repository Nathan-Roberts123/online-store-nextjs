import { procedure, router } from "../trpc";
import prisma from "@/db";

const orderRouter = router({
  getOrders: procedure.query(async () => {
    const orders = await prisma.order.findMany();
    return orders;
  }),
});

export default orderRouter;
