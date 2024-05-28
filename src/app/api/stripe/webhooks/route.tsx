import { NextRequest, NextResponse } from "next/server";
import stripe from "@/utils/stripe/config";
import Stripe from "stripe";
import { render } from "@react-email/render";
import { SES } from "@aws-sdk/client-ses";
import { Email } from "@/emails/payment-success";
import { env } from "@/env";
import prisma from "@/db";
import { TOrder } from "@/types";
import { v4 as uuidv4 } from "uuid";

const ses = new SES({ region: env.AWS_SES_REGION });

const sendEmail = async () => {
  const emailHtml = render(<Email />);

  const params = {
    Source: "khozansindiso2004@gmail.com",
    Destination: {
      ToAddresses: ["khozansindiso20@gmail.com"],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "BlueShop",
      },
    },
  };

  await ses.sendEmail(params);
};

async function createOrder(order: TOrder) {
  await prisma.order.create({
    data: {
      orderId: order.orderId,
      totalPrice: order.totalPrice,
      customerEmail: order.customerEmail,
      quantity: order.quantity,
    },
  });
}

async function clearCart(cartId: string) {
  await prisma.cartProduct.deleteMany({
    where: {
      cartId: cartId,
    },
  });
}

const POST = async (req: Request) => {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webHookSecret = env.WEBHOOK_SECRET!;

  let event: Stripe.Event;

  if (!sig) {
    return NextResponse.json({ message: "Sig was not found" }, { status: 500 });
  }

  try {
    event = stripe.webhooks.constructEvent(body, sig, webHookSecret);
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }

  let intent = null;

  try {
    switch (event["type"]) {
      case "payment_intent.succeeded":
        intent = event.data.object;
        const metadata = intent.metadata;
        await sendEmail();
        await clearCart(metadata["cartId"]);
        await createOrder({
          quantity: Number(metadata["quantity"]),
          totalPrice: intent.amount,
          customerEmail: metadata["email"],
          orderId: uuidv4(),
        });
        break;
      case "payment_intent.payment_failed":
        intent = event.data.object;
        const message =
          intent.last_payment_error && intent.last_payment_error.message;
        if (message) {
          throw new Error(message);
        }
        throw new Error("Payment intent failed");
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }

  return NextResponse.json({ status: 200 });
};

export { POST };
