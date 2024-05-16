import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown } from "lucide-react";
import { Handler } from "./handler";
import { useState } from "react";
import { DndContainer } from "./dnd-container";

type ItemType<T> = {
  id: string | number;
  name: string;
  children?: ItemType<T>[];
} & T;

type Props<T> = {
  item: ItemType<T>;
  children?: React.ReactNode;
  items?: ItemType<T>[];
};

export const SortableItem = <T extends unknown>({
  item,
  children,
  items,
}: Props<T>) => {
  const [collapsed, setCollapsed] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className="border p-3 mb-2 flex items-center justify-between"
        ref={setNodeRef}
        style={style}
      >
        <div>
          <Handler {...{ attributes, listeners }} />
          <span className="text-sm leading-none mx-2">{children}</span>
        </div>
        <div>
          {item.children?.length && (
            <Button variant="ghost" onClick={() => setCollapsed(!collapsed)}>
              <ChevronDown className="size-4 text-slate-500" />
            </Button>
          )}
        </div>
      </div>
      {collapsed && (
        <div className="pl-8">
          <DndContainer
            items={item.children?.map((item) => item.id) ?? []}
            onDragEnd={console.log}
          >
            {item.children?.map((item) => (
              <SortableItem key={item.id} item={item} items={item.children}>
                {item.name}
              </SortableItem>
            ))}
          </DndContainer>
        </div>
      )}
    </>
  );
};
