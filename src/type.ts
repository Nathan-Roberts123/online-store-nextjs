import { z } from "zod";

export const ZSignupFormState = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirm_password: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Passwords must match",
      path: ["confirm_password"],
    }
  );

export type TSignupFormState = z.infer<typeof ZSignupFormState>;

export const ZSigninFormState = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TSigninFormState = z.infer<typeof ZSigninFormState>;

export const ZProduct = z.object({
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
});

export type TProduct = z.infer<typeof ZProduct>;

export const ZCart = z.object({
  product: ZProduct.array(),
});

export type TCart = z.infer<typeof ZCart>;
