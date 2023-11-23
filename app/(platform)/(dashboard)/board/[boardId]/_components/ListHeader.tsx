"use client";
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/useAction";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { List } from "@prisma/client";
import ListOptions from "./ListOptions";

type Props = {
  list: List;
};

const ListHeader = ({ list }: Props) => {
  const [title, setTitle] = useState(list.title);
  const { excute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" title updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: () => {
      toast.error("List update failed");
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const enableEditing = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => {
    setIsEdit(false);
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    if (title === list.title) {
      return disableEditing();
    }
    excute({
      title,
      id,
      boardId,
    });
  };
  if (isEdit) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center justify-between w-full z-40 p-4">
        <FormInput
          id="title"
          ref={inputRef}
          defaultValue={title}
          className="text-base font-bold  h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
          onBlur={onBlur}
        />
        <input type="hidden" name="id" value={list.id} />
        <input type="hidden" name="boardId" value={list.boardId} />
      </form>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <h3 className="p-4 font-semibold text-base " onClick={enableEditing}>
        {title}
      </h3>
      <ListOptions onAddCard={() => {}} list={list} />
    </div>
  );
};

export default ListHeader;
