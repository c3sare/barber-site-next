import { FormInput } from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { useZodForm } from "@/hooks/useZodForm";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import type { getPages } from "@/actions/admin/menu/getPages";
import { Button } from "@/components/ui/button";

const schema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    type: z.enum(["link", "page"])
}).and(z.object({
    type: z.literal("page"),
    pageId: z.string().min(1, "Page id is required").max(255, "Page id is too long"),
}).or(z.object({
    type: z.literal("link"),
    url: z.string().min(1, "Url is required").url().max(255, "Url is too long"),
})))

type Props = {
    pages: Awaited<ReturnType<typeof getPages>>;
}

export const MenuItemForm = ({ pages }: Props) => {
    const form = useZodForm({
        schema,
        defaultValues: {
            name: "",
            type: "page"
        }
    });

    const currentType = form.watch("type");

    return (
        <FormProvider {...form}>
            <form className="space-y-4">
                <FormInput control={form.control} name="name" label="Name" />
                <FormSelect control={form.control} name="type" label="Anchor type" options={[{ value: "link", label: "Link" }, { value: "page", label: "Page" }]} />
                {currentType === "page" && (
                    <FormSelect defaultValue={pages.at(0)?.id ?? ""} control={form.control} name="pageId" label="Page" options={pages.map(page => ({ value: page.id, label: page.name }))} />
                )}
                {currentType === "link" && (
                    <FormInput defaultValue="" control={form.control} name="url" label="Url" />
                )}
                <Button className="w-full" type="submit">Add menu item</Button>
            </form>
        </FormProvider>
    );
}