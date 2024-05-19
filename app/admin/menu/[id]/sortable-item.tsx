import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit2Icon } from "lucide-react";
import { Handler } from "./handler";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MenuItemForm } from "./menu-item-form";
import { getPages } from "@/actions/admin/menu/getPages";
import { menuItem } from "@/drizzle/schema";

type Props<T> = {
  item: typeof menuItem.$inferSelect;
  children?: React.ReactNode;
  pages: Awaited<ReturnType<typeof getPages>>;
};

export const SortableItem = <T extends unknown>({
  item,
  children,
  pages,
}: Props<T>) => {
  const [collapsed, setCollapsed] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Edit2Icon className="size-4 text-slate-500" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Menu Item</DialogHeader>
            <MenuItemForm
              pages={pages}
              id={item.id}
              menuId={item.menuId}
              pageId={item.pageId}
              url={item.url}
              name={item.name}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
