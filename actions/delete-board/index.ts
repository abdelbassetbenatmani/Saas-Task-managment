"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { deleteBoardShema } from "./shema";
import { redirect } from "next/navigation";
import createAudit from "@/lib/create-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementOrganizationBoardCount } from "@/lib/organization-limit";
import { checkSubscription } from "@/lib/subscription";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const isPro = checkSubscription();
  let board;
  const { id } = data;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      } as any,
    });
    if (!isPro) {
      await decrementOrganizationBoardCount();
    }
    await createAudit({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = creatSafeAction(deleteBoardShema, action);
