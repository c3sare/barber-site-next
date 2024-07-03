import { MenuElement } from "./menu-element";
import { MenuForm } from "./menu-form";
import { getAllMenu } from "@/actions/admin/menu/getAllMenu";

export default async function MenuPage() {
  const menus = await getAllMenu();

  return (
    <>
      <MenuForm />
      <div className="flex flex-col w-full mt-2">
        {menus.map((menu) => (
          <MenuElement
            key={menu.id}
            id={menu.id}
            usedMenu={menu.usedBy ?? undefined}
            title={menu.title}
          />
        ))}
      </div>
    </>
  );
}
