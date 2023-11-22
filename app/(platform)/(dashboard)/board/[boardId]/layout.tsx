import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BoardNavBar from "./_components/BoardNavBar";

export async function generateMetadata({
    params
}:{
    params:{
        boardId:string
    }
}) {
    const {orgId} = auth()
    if (!orgId) {
        return {
            title: `Board` ,
          }
      }
      const board = await db.board.findUnique({
        where:{
            id:params.boardId,
            orgId
        } as any
    })
    return {
      title: `${board?.title}` ,
    }
  }

const BoardLayout = async ({ children,params }: { children: React.ReactNode ,params:{boardId:string}}) => {
    const {orgId} = auth()
    if (!orgId) {
      return redirect("/select-organization");
    }
    const board = await db.board.findUnique({
        where:{
            id:params.boardId,
            orgId
        } as any
    })
    if(!board){
       notFound()
    }
  return (
    <div className="relative bg-no-repeat bg-center bg-cover h-full"
    style={{
        backgroundImage:`url(${board?.imageFullUrl})`
    }}
    >
        <BoardNavBar data={board} />
        <div className="absolute inset-0 w-full h-full bg-black opacity-30" />
        <main className="h-full pt-20">{children}</main>
    </div>
  );
};

export default BoardLayout;
