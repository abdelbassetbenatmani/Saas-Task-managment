import { BoardList } from "./_components/BoardList"
import {Info} from "./_components/Info"

const OrganizationPage = () => {
 
  return (
    <div className="w-full mb-20">
      <Info />
      <div className="px-2 md:px-4 mt-5">
      <BoardList/>
      </div>
    </div>
  )
}

export default OrganizationPage