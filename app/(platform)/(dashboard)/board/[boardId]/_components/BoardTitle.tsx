"use client";
import { useState, useRef, ElementRef } from "react";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";


type Props = {
  data: Board;
};

const BoardTitle = ({ data }: Props) => {

    const [title, setTitle] = useState(data.title);
    const {excute} = useAction(updateBoard,{
        onSuccess: (data) =>{
            toast.success(`Board "${data.title}" updated!`);
            setTitle(data.title);
            disableEditing();
        },
        onError: () =>{
            toast.error("Board update failed");
        }
    })

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
    
    excute({
      title,
      id: data.id,
    });
  };
  if(isEdit){
    return (
      <form
      action={onSubmit}
        ref={formRef}
        className="flex items-center justify-between w-full z-40">
       <FormInput 
            id="title"
            ref={inputRef}
            defaultValue={title}
            className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        onBlur={onBlur}
       />
      </form>
    );
  }
  return (
    <Button
      variant="ghost"
        onClick={enableEditing}
      className="text-white text-xl font-bold z-20 hover:bg-black/40">
      {title}
    </Button>
  );
};

export default BoardTitle;
