import { Button } from "@/components/ui/button";
import { Edit2Icon, SquareCheckBigIcon } from "lucide-react";
import Link from "next/link";
import { DeleteMenuDialog } from "./delete-menu-dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MenuOptionButton } from "./menu-option-button";
import { SetHeaderMenuButton } from "./set-header-menu-button";

type Props = {
  id: number;
  title: string;
  usedMenu?: string;
};

export const MenuElement = ({ title, id, usedMenu }: Props) => {
  return (
    <div className="border p-3 mb-2 flex items-center justify-between">
      <div>
        {title}
        {!!usedMenu && (
          <span className="italic ml-2 text-gray-500 text-sm">
            (used in {usedMenu})
          </span>
        )}
      </div>
      <div>
        <TooltipProvider>
          {!usedMenu && <SetHeaderMenuButton menuId={id} />}
          <MenuOptionButton tooltip="Edit" asChild>
            <Link href={`/admin/menu/${id}`}>
              <Edit2Icon />
            </Link>
          </MenuOptionButton>
          <DeleteMenuDialog id={id} title={title} />
        </TooltipProvider>
      </div>
    </div>
  );
};
