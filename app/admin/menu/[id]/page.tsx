import { getMenuById } from "@/actions/admin/menu/getMenuById";
import { SortableContainer } from "./sortable-container";
import { TitleForm } from "./title-form";
import { notFound } from "next/navigation";
import { getPages } from "@/actions/admin/menu/getPages";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MenuItemForm } from "./menu-item-form";

type Props = {
  params: {
    id: string;
  };
};

export default async function MenuPage({ params: { id } }: Props) {
  const menu = await getMenuById(Number(id));

  if (!menu) return notFound();

  const pages = await getPages();

  return (
    <div>
      <TitleForm title={menu.title} id={menu.id} />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mx-auto block mb-2">Add new menu item</Button>
        </DialogTrigger>
        <DialogContent>
          <MenuItemForm menuId={menu.id} pages={pages} />
        </DialogContent>
      </Dialog>
      <SortableContainer menuItems={menu.items} pages={pages} />
    </div>
  );
}
