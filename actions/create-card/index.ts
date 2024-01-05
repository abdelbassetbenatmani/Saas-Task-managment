"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { createCardShema } from "./shema";
import createAudit from "@/lib/create-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let card;
  const { title, boardId ,listId} = data;

  try {
    // get specific list of cards
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board:{
          orgId
        }
      },
    });
    if (!list) {
      return {
        error: "List not found",
      };
    }
     // find last order number in list
     const lastCard = await db.card.findFirst({
      where: {
        listId
      } ,
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      
      }
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
    await createAudit({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/board/${boardId}`);

  return {
    data: card,
  };
};

export const createCard = creatSafeAction(createCardShema, action);
