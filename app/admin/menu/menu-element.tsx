import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import { DeleteMenuDialog } from "./delete-menu-dialog";

type Props = {
  id: number;
  title: string;
};

export const MenuElement = ({ title, id }: Props) => {
  return (
    <div className="border p-3 mb-2 flex items-center justify-between">
      <div>{title}</div>
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/menu/${id}`}>
            <Edit2Icon />
          </Link>
        </Button>
        <DeleteMenuDialog id={id} title={title} />
      </div>
    </div>
  );
};
