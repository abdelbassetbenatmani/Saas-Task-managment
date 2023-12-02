"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { updateCardShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let card;
  const { id, boardId, ...values } = data;
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      } as any,
      data: {
        ...values,
      },
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`board/${boardId}`);
  return {
    data: card,
  };
};

export const updateCard = creatSafeAction(updateCardShema, action);
