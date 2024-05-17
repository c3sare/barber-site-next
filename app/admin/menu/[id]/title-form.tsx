"use client";

import { updateMenuTitle } from "@/actions/admin/menu/updateMenuTitle";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

type Props = {
    title: string;
    id: number;
}

export const TitleForm = ({ title, id }: Props) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const form = useZodForm({
        schema: z.object({
            title: z.string().min(1, "Title is required").default(""),
        }),
        defaultValues: {
            title
        }
    });

    const onSubmit = () => startTransition(form.handleSubmit(async (data) => {
        const result = await updateMenuTitle({
            id,
            title: data.title
        });

        if (result.data?.success) {
            toast({
                title: "Success",
                description: "Title was updated",
            });
        } else {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Something went wrong",
            });
        }

        router.refresh();

    }));

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit} className="flex gap-2 items-end mx-auto my-4 max-w-full w-[300px]">
                <FormInput disabled={isPending} control={form.control} name="title" label="Title" />
                <Button type="submit" disabled={isPending}>Update</Button>
            </form>
        </FormProvider>
    )
}