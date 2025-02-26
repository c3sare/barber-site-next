"use client";

import { FormInput } from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { useZodForm } from "@/hooks/useZodForm";
import { FormProvider } from "react-hook-form";
import type { getPages } from "@/actions/admin/menu/getPages";
import { menuItemAddEditSchema } from "@/validators/menuItemAddEditSchema";
import { useState, useTransition } from "react";
import { addEditMenuItem } from "@/actions/admin/menu/addEditMenuItem";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/loading-button";

type Props = {
  pages: Awaited<ReturnType<typeof getPages>>;
  name?: string;
  id?: number;
  pageId?: number | null;
  url?: string | null;
  menuId: number;
  children?: React.ReactNode;
};

export const MenuItemForm = ({
  pages,
  id,
  pageId,
  url,
  menuId,
  name,
  children,
}: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useZodForm({
    schema: menuItemAddEditSchema,
    defaultValues: id
      ? {
          name,
          type: pageId ? "page" : "link",
          pageId: pageId ? pageId : undefined,
          url: url ? url : undefined,
        }
      : {
          name: "",
          type: "page",
        },
  });

  const currentType = form.watch("type");

  const onSubmit = form.handleSubmit((data) =>
    startTransition(async () => {
      const result = await addEditMenuItem({ ...data, menuId, id });

      if (result?.data?.success) {
        toast({
          title: "Success",
          description: "Operation successful...",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong...",
        });
      }
      form.reset();
      setIsOpenDialog(false);

      router.refresh();
    })
  );

  return (
    <Dialog open={isOpenDialog || isPending} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Menu Item</DialogHeader>
        <FormProvider {...form}>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              disabled={isPending}
            />
            <FormSelect
              control={form.control}
              name="type"
              label="Anchor type"
              options={[
                { value: "link", label: "Link" },
                { value: "page", label: "Page" },
              ]}
              disabled={isPending}
            />
            {currentType === "page" && (
              <FormSelect
                defaultValue={pages.at(0)?.id ?? ""}
                control={form.control}
                name="pageId"
                label="Page"
                options={pages.map((page) => ({
                  value: page.id,
                  label: page.name,
                }))}
                disabled={isPending}
              />
            )}
            {currentType === "link" && (
              <FormInput
                defaultValue=""
                control={form.control}
                name="url"
                label="Url"
                disabled={isPending}
              />
            )}
            <LoadingButton
              className="w-full"
              disabled={isPending}
              type="submit"
            >
              {id ? "Update" : "Add"} menu item
            </LoadingButton>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
