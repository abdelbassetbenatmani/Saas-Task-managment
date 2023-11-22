"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { createBoardShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId,orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let board;
  const { title ,image } = data;

  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHTML
  ] = image.split("|");
  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: "Missing fields. Failed to create board."
    };
  }
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      } as any
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