import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { useEditor } from "@craftjs/core";
import React from "react";

type Props = {
  title: string;
  element: JSX.Element;
  children?: React.ReactNode;
};

export const EditorComponentDragElement = ({
  title,
  element,
  children,
}: Props) => {
  const { connectors, query } = useEditor();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="outline"
          size="icon"
          ref={(ref) => {
            connectors.create(ref!, element);
          }}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <TooltipArrow className="fill-neutral-400" />
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};
