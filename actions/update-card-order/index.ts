"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { updateCardOrderShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let cards;
  const { items, boardId } = data;

  try {
    const transaction = items.map(item =>
      db.card.update({
        where: {
          id: item.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: item.order,
          listId: item.listId,
        },
      })
      
    )
    cards = await db.$transaction(transaction);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/board/${boardId}`);

  return {
    data: cards,
  };
};

export const updateCardOrder = creatSafeAction(updateCardOrderShema, action);
