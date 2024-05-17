"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./sortable-item";
import { DndContainer } from "./dnd-container";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { menuItem } from "@/drizzle/schema";
import { getPages } from "@/actions/admin/menu/getPages";

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

type Props = {
    menuItems: (typeof menuItem.$inferSelect)[];
    pages: Awaited<ReturnType<typeof getPages>>;
}

export const SortableContainer = ({ menuItems, pages }: Props) => {
    const form = useZodForm({
        schema: z.object({
            items: z.array(z.string())
        })
    })
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
        <FormProvider {...form}>
            <form className="max-w-xl mx-auto">
                <DndContainer onDragEnd={handleDragEnd} items={items}>
                    {items.map((item) => (
                        <SortableItem key={item.id} item={item} pages={pages}>
                            {item.name}
                        </SortableItem>
                    ))}
                </DndContainer>
                <Button className="my-4 mx-auto block">Save order</Button>
            </form>
        </FormProvider>
    );
};