"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";


interface InfoProps {
  isPro: boolean;
}

export const Info = ({
  isPro
}:InfoProps) => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-3">
      <Image
        src={organization?.imageUrl as string}
        alt={organization?.name as string}
        width={80}
        height={80}
      />
      <div>
        <h1 className="text-xl font-bold">{organization?.name}</h1>
        <div className="flex text-neutral-600 items-center">
          <CreditCard className="w-4 h-4 mr-2" />
          <p className="text-sm">
            {isPro ? "Pro" : "Free"}
          </p>
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function skeletonInfo() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="w-20 h-20 rounded-xl relative">
        <Skeleton className="absolute w-full h-full" />
      </div>
      <div>
        <Skeleton className="w-40 h-10 mb-2" />
        <div className="flex text-neutral-600 items-center">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="w-32 h-6" />
        </div>
      </div>
    </div>
  );
};
