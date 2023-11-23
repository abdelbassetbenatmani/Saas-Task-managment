"use client";
import { useState, useRef, ElementRef } from "react";
import { ListWrapper } from "./ListWrapper";
import { Plus, X } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEdit, setIsEdit] = useState(false);

  const {excute,fieldErrors} = useAction(createList,{
   onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      
    },
    onError: (error) => {
      toast.error(error);
    },
  })

  const enableEditing = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
      // inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEdit(false);
  };

  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    excute({
      title,
      boardId
    });
  };
  if (isEdit) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors as Record<string, string[] | undefined>}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Add list
            </FormSubmit>
            <Button 
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  };
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
        <Plus size={24} className="mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
