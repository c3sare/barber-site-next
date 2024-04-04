import { getPages } from "@/actions/admin/pages/getPages";
import { Button } from "@/components/ui/button";
import { Settings2Icon } from "lucide-react";
import Link from "next/link";
import { CreatePageDialogForm } from "./create-page-dialog-form";

export default async function PagesPage() {
  const pages = await getPages();

  return (
    <>
      <CreatePageDialogForm />
      <div className="w-full max-w-7xl p-4 mx-auto flex flex-col">
        {pages.map((page) => (
          <div className="w-full px-4 py-2 border">
            <div>{page.name}</div>
            <div>
              <Button asChild variant="ghost" size="icon">
                <Link href={`/admin/pages/${page.id}`}>
                  <Settings2Icon />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
