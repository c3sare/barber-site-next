"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./sortable-item";
import { DndContainer } from "./dnd-container";

const defaultItems = [
  {
    id: 1,
    name: "test 1",
    children: [
      {
        id: 2,
        name: "test 2",
      },
    ],
  },
  {
    id: 3,
    name: "test 3",
    children: [
      {
        id: 4,
        name: "test 4",
      },
    ],
  },
];

export const SortableContainer = () => {
  const [items, setItems] = useState(defaultItems);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContainer onDragEnd={handleDragEnd} items={items}>
      {items.map((item) => (
        <SortableItem key={item.id} item={item} items={items}>
          {item.name}
        </SortableItem>
      ))}
    </DndContainer>
  );
};
