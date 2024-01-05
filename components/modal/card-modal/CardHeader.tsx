import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  data: CardWithList;
};

const CardHeader = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [title, setTitle] = useState(data.title);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { excute ,fieldErrors} = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success("Card updated");
      setTitle(data.title);
    },
    onError: () => {
      toast.error("Card update failed");
    },
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === data.title) return;
    excute({
      id: data.id,
      title,
      boardId: params.boardId as string,
    });
  };
  return (
    <div className="flex items-center gap-x-3 mb-6 w-full ">
      <Layout size={20} className="text-gray-500 " />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            onBlur={onBlur}
            ref={inputRef}
            id="title"
            defaultValue={title}
            errors={fieldErrors as any}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

CardHeader.Skeleton =function HeaderSkeleton ()  {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardHeader;
