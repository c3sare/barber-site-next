import { getMenuById } from "@/actions/admin/menu/getMenuById";
import { SortableContainer } from "./sortable-container";
import { TitleForm } from "./title-form";
import { notFound } from "next/navigation";
import { getPages } from "@/actions/admin/menu/getPages";

type Props = {
    params: {
        id: string;
    }
}

export default async function MenuPage({ params: { id } }: Props) {
    const menu = await getMenuById(id);

    if (!menu) return notFound();

    const pages = await getPages();

    return (
        <div>
            <TitleForm title={menu.title} id={menu.id} />
            <SortableContainer menuItems={menu.items} pages={pages} />
        </div>
    );
}