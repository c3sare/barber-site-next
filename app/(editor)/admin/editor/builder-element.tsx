"use client";

import { Button } from "@/components/ui/button";
import { useEditor } from "@craftjs/core";

type Props = {
  element: JSX.Element;
  children?: React.ReactNode;
};

export const BuilderElement = ({ element, children }: Props) => {
  const { connectors, query } = useEditor();

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-full"
      ref={(ref) => {
        connectors.create(ref!, element);
      }}
    >
      {children}
    </Button>
  );
};
