import { ZUser } from "@/types";
import { procedure, router } from "../trpc";
import prisma from "@/db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  createUser: procedure.input(ZUser).mutation(async ({ input }) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(input.password, salt);

    let user: User;

    try {
      user = await prisma.user.create({
        data: {
          ...input,
          password: hash,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          if (e.meta) {
            if (e.meta.modelName === "User") {
              const error: TRPCError = {
                name: "TRPCError",
                code: "BAD_REQUEST",
                message: "user already exist",
              };
              throw error;
            }
          }
        }
      }
      throw e;
    }

    await prisma.account.create({
      data: {
        userId: user.id,
        type: "credentials",
        provider: "email",
        providerAccountId: uuidv4(),
      },
    });

    return { name: user.name, email: user.email };
  }),
});
