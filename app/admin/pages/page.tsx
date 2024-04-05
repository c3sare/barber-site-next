import { getPages } from "@/actions/admin/pages/getPages";
import { Button } from "@/components/ui/button";
import { Settings2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { CreatePageDialogForm } from "./create-page-dialog-form";
import { DeletePageDialog } from "./delete-page-dialog";

export default async function PagesPage() {
  const pages = await getPages();

  return (
    <>
      <CreatePageDialogForm />
      <div className="w-full p-4 mx-auto flex flex-col gap-2">
        {pages.map((page) => (
          <div
            key={page.id}
            className="w-full px-4 py-2 border flex justify-between items-center"
          >
            <div>{page.name}</div>
            <div className="space-x-2">
              <Button asChild variant="ghost" size="icon">
                <Link href={`/admin/pages/${page.id}`}>
                  <Settings2Icon />
                </Link>
              </Button>
              <DeletePageDialog id={page.id}>
                <Button variant="ghost" size="icon">
                  <TrashIcon />
                </Button>
              </DeletePageDialog>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}