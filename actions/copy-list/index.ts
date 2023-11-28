"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import db from "@/lib/db";
import { creatSafeAction } from "@/lib/create-safe-action";
import { copyListShema } from "./shema";

const action = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  let list;
  const { id, boardId } = data;
  try {
    // find unique the list item
    const listCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!listCopy) {
      return {
        error: "List not found",
      };
    }
    // find last order number in list
    const lastList = await db.list.findFirst({
      where: {
        boardId: boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const lastOrder = lastList ? lastList.order + 1 : 1;
    const cardArray: any = listCopy.cards;
    if (cardArray.length > 0) {
      // create list
      list = await db.list.create({
        data: {
          boardId: listCopy.boardId,
          title: `${listCopy.title} - Copy`,
          order: lastOrder,
          cards: {
            createMany: {
              data: cardArray.map((card: any) => ({
                title: card.title,
                description: card.description,
                order: card.order,
              })),
            },
          },
        },
        include: {
          cards: true,
        },
      });
    } else {
      list = await db.list.create({
        data: {
          boardId: listCopy.boardId,
          title: `${listCopy.title} - Copy`,
          order: lastOrder,
        },
        include: {
          cards: true,
        },
      });
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = creatSafeAction(copyListShema, action);
