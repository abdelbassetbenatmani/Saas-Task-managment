"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { updateListShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
    const { userId,orgId } = auth();
    if (!userId || !orgId) {
      return {
        error: "Unauthorized",
      };
    }
    let list;
    const { title,id,boardId } = data;
    try {
      list = await db.list.update({
        where:{
          id,
          boardId,
          board: {
            orgId,
          },
        }as any,
        data: {
            title,
        },
      })
    } catch (error:any) {
      return {
        error: error.message,
      };
    }
    revalidatePath(`/board/${boardId}`);
      return {
          data: list,
      };
  };
  
  export const updateList = creatSafeAction(updateListShema,action);