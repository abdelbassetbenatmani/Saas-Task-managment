"use client";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { generateLogMessage } from "@/lib/generate-log-msg";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import React from "react";

interface ActivityProps {
  items: AuditLog[];
}

const Activity = ({ items }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-6 w-6 text-neutral-400" />
      <div className="w-full">
        <p className="w-24 h-6 mb-2">Activity</p>

        <div className="w-full flex flex-col space-y-4">
          {items.map((item) => (
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
        </div>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};

export default Activity;
