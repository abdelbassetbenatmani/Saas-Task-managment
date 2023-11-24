"use client";
import { List } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/useAction";
import { Separator } from "@/components/ui/separator";
import { deleteList } from "@/actions/delete-list";
import { toast } from "sonner";
import FormSubmit from "@/components/form/form-submit";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";
type Props = {
  list: List;
  onAddCard: () => void;
};

const ListOptions = ({ list, onAddCard }: Props) => {
    const closeRef = useRef<ElementRef<"button">>(null);
  const { excute: excuteDelete, isLoading } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted!`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { excute: excuteCopy, isLoading:isLoadingCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied!`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    excuteDelete({
      id,
      boardId,
    });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    excuteCopy({
      id,
      boardId,
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-80 pt-5 relative px-0">
        <span className="text-base text-center font-semibold ms-4 mb-4 ">
          List Actions
        </span>
        <PopoverClose ref={closeRef} asChild className="absolute right-1 top-1">
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <div className="flex flex-col  mt-4">
          <Button
            variant="ghost"
            // disabled={isLoading}
            className="w-full py-2 justify-start font-normal text-sm"
            onClick={() => {}}>
            Add to List
          </Button>
          <form action={onCopy}>
            <input type="hidden" name="id" value={list.id} />
            <input type="hidden" name="boardId" value={list.boardId} />
            <FormSubmit
              variant="ghost"
              disabled={isLoadingCopy}
              className="w-full py-2 justify-start font-normal text-sm ">
              Copy List
            </FormSubmit>
          </form>
          <Separator />
          <form action={onDelete}>
            <input type="hidden" name="id" value={list.id} />
            <input type="hidden" name="boardId" value={list.boardId} />
            <FormSubmit
              variant="ghost"
              disabled={isLoading}
              className="w-full py-2 justify-start font-normal text-sm text-red-600">
              Delete List
            </FormSubmit>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
