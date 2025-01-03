import { getMenuById } from "@/actions/admin/menu/getMenuById";
import { SortableContainer } from "./sortable-container";
import { TitleForm } from "./title-form";
import { notFound } from "next/navigation";
import { getPages } from "@/actions/admin/menu/getPages";
import { Button } from "@/components/ui/button";
import { MenuItemForm } from "./menu-item-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MenuPage({ params }: Props) {
  const { id } = await params;
  const menu = await getMenuById(Number(id));

  if (!menu) return notFound();

  const pages = await getPages();

  return (
    <div>
      <TitleForm title={menu.title} id={menu.id} />
      <MenuItemForm menuId={menu.id} pages={pages}>
        <Button className="mx-auto block mb-2">Add new menu item</Button>
      </MenuItemForm>
      <SortableContainer menuItems={menu.items} pages={pages} />
    </div>
  );
}
