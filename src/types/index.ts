import { z } from "zod";
import { zfd } from "zod-form-data";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const statusValues = ["Active", "InActive"] as const;

export const ZSignupFormState = z
  .object({
    username: z.string().min(2),
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
  id: z.string(),
  name: z.string().min(2),
  price: z.coerce.number(),
  image: z
    .any()
    .refine((file) => {
      return !!file;
    }, "Image is required")
    .refine((file) => {
      if (!!file) {
        return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
      }
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  status: z.enum(statusValues),
  suk: z.string().min(2),
  quantity: z.coerce.number(),
});

export type TProduct = z.infer<typeof ZProduct>;

export const ZCart = z.object({
  products: ZProduct.array(),
});

export type TCart = z.infer<typeof ZCart>;

export const ZFProuct = zfd.formData({
  id: zfd.text().optional(),
  name: zfd.text(),
  price: zfd.numeric(),
  image: z.any(),
  suk: zfd.text(),
  status: zfd.text(z.enum(statusValues)),
  quantity: zfd.numeric(),
});

export const ZUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type TUser = z.infer<typeof ZUser>;

export type cartItem = {
  quantity: number;
  product: TProduct;
  cartId: string;
  productId: string;
};

export const ZOrder = z.object({
  orderId: z.string(),
  totalPrice: z.number(),
  customerEmail: z.string(),
  quantity: z.number(),
  createdAt: z.string().optional(),
});

export type TOrder = z.infer<typeof ZOrder>;
