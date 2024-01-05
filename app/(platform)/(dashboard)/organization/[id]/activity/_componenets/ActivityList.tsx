import { Skeleton } from "@/components/ui/skeleton";
import { generateLogMessage } from "@/lib/generate-log-msg";
import React from "react";
import { format } from "date-fns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((item) => (
        <div key={item.id} className="flex items-center gap-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.userImage} />
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold lowercase text-neutral-700">
                {item.userName}
              </span>{" "}
              {generateLogMessage(item)}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};

export default ActivityList;
