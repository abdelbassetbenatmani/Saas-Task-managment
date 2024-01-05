"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { updateBoardShema } from "./shema";
import createAudit from "@/lib/create-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const action = async (data: InputType): Promise<OutputType> => {
    const { userId,orgId } = auth();
    if (!userId || !orgId) {
      return {
        error: "Unauthorized",
      };
    }
    let board;
    const { title,id } = data;
    try {
      board = await db.board.update({
        where:{
            id,
            orgId
        }as any,
        data: {
            title,
          },
      })
      await createAudit({
        entityId: board.id,
        entityTitle: board.title,
        entityType: ENTITY_TYPE.BOARD,
        action: ACTION.UPDATE,
      });
    } catch (error:any) {
      return {
        error: error.message,
      };
    }
    revalidatePath(`board/${id}`);
      return {
          data: board,
      };
  };
  
  export const updateBoard = creatSafeAction(updateBoardShema,action);