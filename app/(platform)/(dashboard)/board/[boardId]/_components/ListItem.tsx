"use client";
import { useState, useRef, ElementRef } from "react";
import ListHeader from "./ListHeader";
import { ListWithCards } from "@/types";
import CardForm from "./CardForm";
import CardItem from "./CardItem";

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
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-slate-300 pb-2">
        <ListHeader onAddCard={enableEditing} list={data} />
        <div className="px-2">
          <ul className="py-2">
            {data.cards.map((card, index) => (
              <CardItem key={card.id} card={card} index={index} />
            ))}
          </ul>
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
  );
};

export default ListItem;
