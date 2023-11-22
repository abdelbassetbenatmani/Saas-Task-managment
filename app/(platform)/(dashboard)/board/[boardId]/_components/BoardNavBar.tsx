import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Board } from "@prisma/client"
import BoardTitle from "./BoardTitle"
import BoardOptions from "./BoardOptions"

interface BoardNavbarProps {
   data:Board
}

const BoardNavBar = async ({
    data
}:BoardNavbarProps) => {
  
  return (
    <div
    className="z-40 flex items-center justify-between w-full px-2 md:px-4 h-20 bg-black/50 text-white text-xl font-bold"
    >
        <BoardTitle
            data={data}
        />

        <div className="ml-auto z-30">
          <BoardOptions  id={data.id}/>
        </div>
    </div>
  )
}

export default BoardNavBar