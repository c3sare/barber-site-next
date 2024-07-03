import { getPages } from "@/actions/admin/pages/getPages";
import { Button } from "@/components/ui/button";
import { GlobeIcon, Settings2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { CreatePageDialogForm } from "./create-page-dialog-form";
import { DeletePageDialog } from "./delete-page-dialog";

export default async function PagesPage() {
  const pages = await getPages();

  return (
    <>
      <CreatePageDialogForm />
      <div className="w-full py-4 mx-auto flex flex-col gap-2">
        {pages.map((page) => (
          <div
            key={page.id}
            className="w-full px-2 py-2 border flex justify-between items-center text-xs"
          >
            <div>{page.name}</div>
            <div className="space-x-1 flex-nowrap flex">
              <Button asChild variant="ghost" size="icon">
                <Link href={`/admin/pages/editor/${page.id}`}>
                  <Settings2Icon className="size-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={`/page/${page.slug}`}>
                  <GlobeIcon className="size-6" />
                </Link>
              </Button>
              <DeletePageDialog id={page.id}>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="size-6" />
                </Button>
              </DeletePageDialog>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
