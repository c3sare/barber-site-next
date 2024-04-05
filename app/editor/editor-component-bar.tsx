"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ButtonIcon } from "@radix-ui/react-icons";
import { TooltipArrow } from "@radix-ui/react-tooltip";

export const EditorComponentBar = () => {
  return (
    <div className="w-20 h-screen border-r flex flex-col items-center py-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon">
              <ButtonIcon className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <TooltipArrow className="fill-neutral-400" />
            <p>Button</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
