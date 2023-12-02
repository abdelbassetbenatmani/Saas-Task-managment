"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { copyCardShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let card;
  const { id, boardId } = data;
  try {
    // find unique the list item
    const cardCopy = await db.card.findUnique({
      where: {
        id,
        list:{
          board:{
            orgId
          }
        }
      },
    });
    if (!cardCopy) {
      return {
        error: "Card not found",
      };
    }
    // find last order number in card
    const lastCard = await db.card.findFirst({
      where: {
        listId: cardCopy.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const lastOrder = lastCard ? lastCard.order + 1 : 1;

    // create new card
    card = await db.card.create({
      data: {
        title:`${cardCopy.title} -Copy`,
        description: cardCopy.description,
        order: lastOrder,
        listId: cardCopy.listId,
      },
    });

  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = creatSafeAction(copyCardShema, action);
