import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const card = await db.card.findUnique({
      where: {
        id:params.id,
        list: {
            board: {
              orgId,
            },
          },

      },
      include:{
        list:{
            select:{
                title:true,
            }
        }
      }
    });
    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}