"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { deleteListShema } from "./shema";
import createAudit from "@/lib/create-audit";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const action = async (data: InputType): Promise<OutputType> => {
    const { userId,orgId } = auth();
    if (!userId || !orgId) {
      return {
        error: "Unauthorized",
      };
    }
    let list;
    const { id,boardId } = data;
    try {
      list = await db.list.delete({
        where:{
            id,
            boardId,
            board:{
              orgId
            }
        }as any,
     
      })
      await createAudit({
        entityId: list.id,
        entityTitle: list.title,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.DELETE,
      });
    } catch (error:any) {
      return {
        error: error.message,
      };
    }
    revalidatePath(`/board/${boardId}`);
    return { data: list };
  };
  
  export const deleteList = creatSafeAction(deleteListShema,action);