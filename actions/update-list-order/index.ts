"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { updateListOrderShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let lists;
  const { items, boardId } = data;

  try {
    const transaction = items.map(item =>
      db.list.update({
        where: {
          id: item.id,
          board: {
            orgId,
          },
        },
        data: {
          order: item.order,
        },
      })
      
    )
    lists = await db.$transaction(transaction);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/board/${boardId}`);

  return {
    data: lists,
  };
};

export const updateListOrder = creatSafeAction(updateListOrderShema, action);
