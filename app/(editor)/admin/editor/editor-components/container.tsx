"use client";

import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
};

export const Container = ({ children, ...props }: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      className={cn("w-full min-h-16")}
      ref={(ref) => {
        connect(ref!);
      }}
      {...props}
    >
      {children}
    </div>
  );
};
