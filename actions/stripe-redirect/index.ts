"use server";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { stripeRedirectSchema } from "./shema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const settingsUrl = absoluteUrl(`/organization/${orgId}`);
  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      url = session.url;
    } else {
      const session = await stripe.checkout.sessions.create({
        customer_email: user.emailAddresses[0].emailAddress,
        billing_address_collection: "auto",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Taskona Pro",
                description: "Taskona Pro for unlimited organization boards",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        metadata: {
          orgId,
        },
      });
      url = session.url || "";
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`organization/${orgId}`);
  return { data: url };
};

export const stripeRedirect = creatSafeAction(stripeRedirectSchema, action);
