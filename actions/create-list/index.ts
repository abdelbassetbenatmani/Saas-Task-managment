"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { createListShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let list;
  const { title, boardId } = data;

  try {
    // find a board using boardId and orgId
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
    if (!board) {
      return {
        error: "Board not found",
      };
    }

    // find last order number in list
    const lastList = await db.list.findFirst({
      where: {
        boardId: boardId 
      } ,
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      
      }
    });
    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      } as any,
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const createList = creatSafeAction(createListShema, action);
