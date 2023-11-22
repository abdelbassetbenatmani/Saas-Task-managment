import { FormPopOver } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const BoardList = async () => {
  const {orgId} = auth()
  if (!orgId) {
    return redirect("/select-organization");
  }
  const boardList = await db.board.findMany({
    where: {
      orgId
    } as any,
    orderBy: {
      createdAt: "desc"
    }
  },
    
    )
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-3">
        <User2 className="w-6 h-6" />
        <p className="text-lg font-semibold">Your Boards </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5">
        <FormPopOver 
        side="bottom"
        sideOffset={10}
        align="center"
        >
        <div
          className="relative flex flex-col items-center justify-center h-32 rounded-lg border-2 border-dashed border-neutral-200 cursor-pointer hover:border-neutral-300"
          role="button">
          <p className="text-lg font-semibold text-neutral-500">
            Create new board
          </p>
          <span className="text-sm text-neutral-500"> 5 remaining </span>
          <Hint
            description={`
          Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
        `}
            sideOffset={40}>
            <HelpCircle className="w-4 h-4 absolute bottom-2 right-2 text-neutral-600" />
          </Hint>
        </div>
        </FormPopOver>
        {
          boardList.map((board) => (
            <Link href={`/board/${board.id}`} key={board.id}
              className="group relative flex flex-col items-center justify-center h-32 rounded-lg  cursor-pointer  bg-no-repeat bg-center bg-cover bg-sky-700 hover:border-neutral-300"
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            >
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
              <p className="text-lg font-semibold text-white z-20">
                {board.title}
              </p>
             
            </Link>
          ))
        }
      </div>
    </div>
  );
};
