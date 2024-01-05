import { checkSubscription } from "@/lib/subscription";
import { Info } from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_componenets/SubscriptionButton";

const page = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator/>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default page;
