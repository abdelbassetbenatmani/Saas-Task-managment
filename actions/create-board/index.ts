"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { createBoardShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }
  let board;
  const { title } = data;
  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error:any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`board/${board.id}`);
    return {
        data: board,
    };
};

export const createBoard = creatSafeAction(createBoardShema,action);