"use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

type Props = {
  boardId: string;
  lists: ListWithCards[];
};

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ boardId, lists }: Props) => {
  const [data, setData] = useState(lists);
  const [orderedData, setOrderedData] = useState(lists);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reOrder(
        orderedData,
        source.index,
        destination.index,
      ).map((item, index) => ({ ...item, order: index }));

      setOrderedData(items);
      // executeUpdateListOrder({ items, boardId });
    }

    // User moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // Source and destination list
      const sourceList = newOrderedData.find(list => list.id === source.droppableId);
      const destList = newOrderedData.find(list => list.id === destination.droppableId);

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reOrder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        // executeUpdateCardOrder({
        //   boardId: boardId,
        //   items: reorderedCards,
        // });
        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        // executeUpdateCardOrder({
        //   boardId: boardId,
        //   items: destList.cards,
        // });
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" type="list" direction="horizontal">
        {(provided) => (
          <ol
            className="flex gap-x-3 h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;