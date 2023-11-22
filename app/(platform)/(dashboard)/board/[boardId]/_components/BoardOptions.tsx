"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/useAction";
import { deleteBoard } from "@/actions/delete-board";
type Props = {
  id: string;
};

const BoardOptions = ({ id }: Props) => {
  const {excute,isLoading } = useAction(deleteBoard,{
    onError: () =>{
      console.log("Board delete failed");
      
    }
  })

  const onDelete = () => {
    excute({id});
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
        className="w-80 pt-3 relative">
        <span className="text-base text-center font-semibold">
          Board Actions
        </span>
        <PopoverClose asChild className="absolute right-1 top-1">
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <div className="flex flex-col space-y-2">
          <Button
            variant="destructive"
            size="sm"
            disabled={isLoading}
            className="w-full mt-4"
            onClick={onDelete}>
            Delete Board
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
