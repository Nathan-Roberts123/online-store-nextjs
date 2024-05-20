import { NextRequest, NextResponse } from "next/server";
import stripe from "@/utils/stripe/config";
import Stripe from "stripe";
import { render } from "@react-email/render";
import { SES } from "@aws-sdk/client-ses";
import { Email } from "@/emails/payment-success";
import { env } from "@/env";

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
        Data: "hello world",
      },
    },
  };

  await ses.sendEmail(params);
};

const POST = async (req: NextRequest) => {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webHookSecret = env.WEBHOOK_SECRET!;

  let event: Stripe.Event;

  if (!sig) {
    return NextResponse.json({ message: "Sig was not found" }, { status: 400 });
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
        await sendEmail();
        console.log("email sent....");
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
  } catch (e) {
    console.log("send: ", e);
    return NextResponse.json({ message: e }, { status: 500 });
  }

  return NextResponse.json({ status: 200 });
};

export { POST };
