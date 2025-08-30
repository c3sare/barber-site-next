"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { SortableItem } from "./sortable-item";
import { DndContainer } from "./dnd-container";
import { FormProvider } from "react-hook-form";
import { useZodForm } from "@/hooks/useZodForm";
import * as z from "zod/mini";
import { menuItem } from "@/drizzle/schema";
import { getPages } from "@/actions/admin/menu/getPages";
import { changeMenuItemsOrder } from "@/actions/admin/menu/changeMenuItemsOrder";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/loading-button";

type Props = {
  menuItems: (typeof menuItem.$inferSelect)[];
  pages: Awaited<ReturnType<typeof getPages>>;
};

export const SortableContainer = ({ menuItems, pages }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const form = useZodForm({ schema: z.object({ items: z.array(z.number()) }) });
  const [items, setItems] = useState(menuItems);

  useEffect(() => {
    setItems(menuItems);
  }, [menuItems]);

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await changeMenuItemsOrder(items.map((item) => item.id));

      if (result?.data?.success) {
        toast({ title: "Success", description: "Order was changed" });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        });
      }

      router.refresh();
    });
  };

  return (
    <FormProvider {...form}>
      <form className="max-w-xl mx-auto overflow-hidden" onSubmit={onSubmit}>
        <DndContainer onDragEnd={handleDragEnd} items={items}>
          {items.map((item) => (
            <SortableItem key={item.id} item={item} pages={pages}>
              {item.name}
            </SortableItem>
          ))}
        </DndContainer>
        <LoadingButton
          type="submit"
          disabled={isPending}
          className="my-4 mx-auto block"
        >
          Save order
        </LoadingButton>
      </form>
    </FormProvider>
  );
};
