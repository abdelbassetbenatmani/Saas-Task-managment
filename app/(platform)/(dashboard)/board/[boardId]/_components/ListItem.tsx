"use client";
import { useState, useRef, ElementRef } from "react";
import ListHeader from "./ListHeader";
import { ListWithCards } from "@/types";
import CardForm from "./CardForm";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type Props = {
  data: ListWithCards;
  index: number;
};

const ListItem = ({ data, index }: Props) => {
  const textErea = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textErea.current?.focus();
      textErea.current?.select();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {
        (provided) => (
          <li
            className="shrink-0 h-full w-[272px] select-none"
            {...provided.draggableProps}
            ref={provided.innerRef}>
            <div className="w-full rounded-md bg-slate-300 pb-2"
              {...provided.dragHandleProps}
            >
              <ListHeader onAddCard={enableEditing} list={data} />
              <div className="px-2">
                <Droppable droppableId={data.id} type="card">
                  {
                    (provided) => (
                      <ul
                        className="py-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {data.cards.map((card, index) => (
                          <CardItem key={card.id} card={card} index={index} />
                        ))}
                        {provided.placeholder}
                      </ul>
                    )
                  }
                </Droppable>
              </div>
              <div className="hello">
                <CardForm
                  listId={data.id}
                  enableEditing={enableEditing}
                  disableEditing={disableEditing}
                  isEditing={isEditing}
                  ref={textErea as any}
                />
              </div>
            </div>
          </li>
        )
      }
    </Draggable>
  );
};

export default ListItem;
