"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { deleteBoardShema } from "./shema";
import { redirect } from "next/navigation";

const action = async (data: InputType): Promise<OutputType> => {
    const { userId,orgId } = auth();
    if (!userId || !orgId) {
      return {
        error: "Unauthorized",
      };
    }
    let board;
    const { id } = data;
    try {
      board = await db.board.delete({
        where:{
            id,
            orgId
        }as any,
     
      })
    } catch (error:any) {
      return {
        error: error.message,
      };
    }
    revalidatePath(`organization/${orgId}`);
    redirect(`/organization/${orgId}`);
  };
  
  export const deleteBoard = creatSafeAction(deleteBoardShema,action);