import { checkSubscription } from "@/lib/subscription"
import { BoardList } from "./_components/BoardList"
import {Info} from "./_components/Info"

const OrganizationPage = async () => {
 
  const isPro = await checkSubscription()
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <div className="px-2 md:px-4 mt-5">
      <BoardList/>
      </div>
    </div>
  )
}

export default OrganizationPage