"use client"
import { updateCard } from "@/actions/update-card";
import FormSubmit from "@/components/form/form-submit";
import FormTextArea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  data: CardWithList;
};

const CardDescription = ({ data }: Props) => {
  const [editing, setEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const textEreaRef = useRef<ElementRef<"textarea">>(null);
  const queryClient = useQueryClient();
  const params = useParams();

  const { excute,fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success("Card description updated");
      disableEditing();
    },
    onError: () => {
      toast.error("Card description update failed");
    },
  });
  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    if (description === data.description) return;
    excute({
      id: data.id,
      description,
      boardId: params.boardId as string,
    });
  };

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      textEreaRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setEditing(false);
  };

  useOnClickOutside(formRef, disableEditing);
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <AlignLeft className="h-6 w-6 mt-1 " />
      <div className="w-full">
        <p className="w-24 h-6 mb-2 font-semibold">Description:</p>
        {editing ? (
          <form ref={formRef} action={onSubmit}>
            <FormTextArea
              ref={textEreaRef}
              id="description"
              className="w-full mt-2"
              defaultValue={data.description || undefined}
              errors={fieldErrors as any}
            />
            <div className="flex items-center gap-x-3 mt-3">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            className="w-full h-[90px] bg-neutral-200 rounded-lg py-3 px-3.5"
            role="button"
            onClick={enableEditing}>
            {data.description ? (
              <p className="text-sm text-neutral-700">{data.description}</p>
            ) : (
              <p className="text-sm text-neutral-700 text-opacity-70">
                Add a more detailed description...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CardDescription.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-full h-[90px] bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardDescription;
