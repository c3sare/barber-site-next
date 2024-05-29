import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit2Icon } from "lucide-react";
import { Handler } from "./handler";
import { MenuItemForm } from "./menu-item-form";
import { getPages } from "@/actions/admin/menu/getPages";
import { menuItem } from "@/drizzle/schema";
import { DeleteDialog } from "./delete-dialog";

type Props = {
  item: typeof menuItem.$inferSelect;
  children?: React.ReactNode;
  pages: Awaited<ReturnType<typeof getPages>>;
};

export const SortableItem = ({ item, children, pages }: Props) => {
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
        <DeleteDialog id={item.id} />
        <MenuItemForm
          pages={pages}
          id={item.id}
          menuId={item.menuId}
          pageId={item.pageId}
          url={item.url}
          name={item.name}
        >
          <Button variant="ghost" size="sm">
            <Edit2Icon className="size-4 text-slate-500" />
          </Button>
        </MenuItemForm>
      </div>
    </div>
  );
};
