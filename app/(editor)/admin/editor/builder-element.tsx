"use client";

import { Button } from "@/components/ui/button";
import { useEditor } from "@craftjs/core";

type Props = {
  element: React.ReactElement;
  children?: React.ReactNode;
};

export const BuilderElement = ({ element, children }: Props) => {
  const { connectors } = useEditor();

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-full flex items-center justify-start px-4 gap-3 cursor-grab active:cursor-grabbing"
      ref={(ref) => {
        connectors.create(ref!, element);
      }}
    >
      {children}
    </Button>
  );
};
