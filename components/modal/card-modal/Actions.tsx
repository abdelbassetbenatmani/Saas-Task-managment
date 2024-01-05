import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useCardModal } from "@/hooks/useCardModal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  data: CardWithList;
};

const Actions = ({ data }: Props) => {
  const params = useParams();
  const cardModal = useCardModal();
  const { excute: ExcuteCopy, isLoading: copyLoading } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success("Card copied successfully");
      cardModal.onClose();
    },
    onError: () => {
      toast.error("Card copied failed");
    },
  });
  const { excute: ExcuteDelete, isLoading: deleteLoading } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success("Card delete successfully");
        cardModal.onClose();
      },
      onError: () => {
        toast.error("Card delete failed");
      },
    }
  );

  const onCopy = () => {
    ExcuteCopy({
      id: data.id,
      boardId: params.boardId as string,
    });
  };

  const onDelete = () => {
    ExcuteDelete({
      id: data.id,
      boardId: params.boardId as string,
    });
  };

  return (
    <div>
      <p className="w-24 h-6 mb-2 font-semibold">Actions:</p>
      <div className="flex flex-col space-y-3">
        <Button
          onClick={onCopy}
          className="w-full hover:bg-neutral-200 text-sm"
          variant="outline">
          <Copy className="w-4 h-4 mr-2 text-neutral-700" /> Copy
        </Button>
        <Button
          onClick={onDelete}
          className="w-full hover:bg-red-400 text-sm"
          variant="outline">
          <Trash className="w-4 h-4 mr-2 text-neutral-700 " /> Delete
        </Button>
      </div>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};

export default Actions;
