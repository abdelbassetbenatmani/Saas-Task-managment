"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { createBoardShema } from "./shema";
import createAudit from "@/lib/create-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementOrganizationBoardCount,isAvailableOrganizationBoard } from "@/lib/organization-limit";
import { checkSubscription } from "@/lib/subscription";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId,orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }


  const isAvailable = await isAvailableOrganizationBoard();
  const isPro = await checkSubscription()
  if (!isAvailable && !isPro) {
    return {
      error: "You have reached the maximum number of boards for your organization. Please upgrade your plan to create more boards.",
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

    if(!isPro) await incrementOrganizationBoardCount();
    
    await createAudit({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
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