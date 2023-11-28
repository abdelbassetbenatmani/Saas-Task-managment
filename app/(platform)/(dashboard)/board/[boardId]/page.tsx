import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import ListContainer from './_components/ListContainer'


interface BoardIdPageProps{
  params: {
    boardId: string
  }

}
const BoardPage = async ({
  params,
}: BoardIdPageProps) => {

  const {orgId} = auth()
  if(!orgId) {
    redirect('/select-organiztion')
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board:{
        orgId
      }
    },
    include:{
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    }

  })
  
  return (
    <div className="p-4 h-full overflow-x-auto">
      
      <ListContainer lists={lists}  boardId={params.boardId}/>
    </div>
  )
}

export default BoardPage
