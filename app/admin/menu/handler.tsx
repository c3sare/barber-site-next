import { Button } from "@/components/ui/button";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { GripVertical } from "lucide-react";

export const Handler = ({
  attributes,
  listeners,
}: {
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}) => {
  const handleProps = { ...attributes, ...listeners };

  return (
    <Button variant="ghost" className="px-1 cursor-move" {...handleProps}>
      <GripVertical className="size-4 text-slate-500" />
    </Button>
  );
};
