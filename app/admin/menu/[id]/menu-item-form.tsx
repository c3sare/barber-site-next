"use client";

import { FormInput } from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { useZodForm } from "@/hooks/useZodForm";
import { FormProvider } from "react-hook-form";
import type { getPages } from "@/actions/admin/menu/getPages";
import { Button } from "@/components/ui/button";
import { menuItemAddEditSchema } from "@/validators/menuItemAddEditSchema";
import { useTransition } from "react";
import { addEditMenuItem } from "@/actions/admin/menu/addEditMenuItem";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  pages: Awaited<ReturnType<typeof getPages>>;
  name?: string;
  id?: number;
  pageId?: number | null;
  url?: string | null;
  menuId: number;
};

export const MenuItemForm = ({
  pages,
  id,
  pageId,
  url,
  menuId,
  name,
}: Props) => {
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

      if (result.data?.success) {
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

      router.refresh();
    })
  );

  console.log(form.formState.errors);

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
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
        <Button className="w-full" type="submit" disabled={isPending}>
          {id ? "Update" : "Add"} menu item
        </Button>
      </form>
    </FormProvider>
  );
};
