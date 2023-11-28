"use client";
import { createCard } from "@/actions/create-card";
import FormSubmit from "@/components/form/form-submit";
import FormTextArea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, forwardRef, useRef } from "react";
import { toast } from "sonner";

type Props = {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
};

const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null);
    const { excute } = useAction(createCard, {
        onSuccess: (data) => {
          toast.success(`Card "${data.title}" created!`);
          disableEditing();
        },
        onError: () => {
          toast.error("Card created failed");
        },
      });
      const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;
        excute({
          title,
          listId,
          boardId,
        });
      };

    if (isEditing) {
      return (
        <form action={onSubmit} className="px-2"  ref={formRef}>
          <FormTextArea 
            ref={ref}
            id="title"
            label="Card title"
            placeholder="Enter a title for this card..."
            required
            className="w-full"
          />
          <input type="hidden" name="listId" value={listId} />
          <div className="flex justify-between gap-x-2 mt-3">
            <FormSubmit className="w-full" >
                Add card
            </FormSubmit>
            <Button onClick={disableEditing} variant="ghost">
              <X size={16} className="" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-3">
        <Button
          className="w-full flex justify-start rounded-none"
          variant="ghost"
          onClick={enableEditing}>
          <Plus size={16} className="mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";

export default CardForm;
