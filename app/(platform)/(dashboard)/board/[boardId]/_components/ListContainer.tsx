// "use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useState } from "react";
import ListItem from "./ListItem";

type Props = {
  boardId: string;
  lists: ListWithCards[];
};

const ListContainer = ({ boardId, lists }: Props) => {
  // const [data, setData] = useState(lists);
  return (
    <ol className="flex gap-x-3 h-full ">
      {lists.map((list,index) => (
        <ListItem key={list.id} index={index} data={list} />
      ))}
      <ListForm />
    </ol>
  );
};

export default ListContainer;
