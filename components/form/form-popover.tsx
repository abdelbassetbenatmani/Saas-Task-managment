"use client";
import { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FormInput } from "./form-input";
import FormSubmit from "./form-submit";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useRouter } from "next/navigation";

interface PopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}
export const FormPopOver = ({
  children,
  side = "bottom",
  sideOffset = 0,
  align = "center",
}: PopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const { excute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created successfully");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
    onComplete: () => {
      console.log("complete");
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    
    excute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3 relative">
        <span className="text-base text-center font-semibold">
          Create a board
        </span>
        <PopoverClose 
          ref={closeRef}
        asChild className="absolute right-1 top-1">
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="flex flex-col gap-y-4">
          <div className="mt-3">
            <FormPicker
              id="image"
              errors={fieldErrors as Record<string, string[] | undefined>}
            />
            <FormInput
              label="Board Name"
              placeholder="Board Name"
              id="title"
              type="text"
              className="focus:outline-none focus:border-none"
              errors={fieldErrors as Record<string, string[] | undefined>}
            />
          </div>
          <div>
            <FormSubmit className="w-full">Create</FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
