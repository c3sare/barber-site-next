"use client";

import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
};

export const Section = ({ children, ...props }: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <section className={cn("w-full")}>
      <div
        className="container min-h-[400px] flex justify-between gap-4 flex-col md:flex-row"
        ref={(ref) => {
          connect(ref!);
        }}
        {...props}
      >
        {children}
      </div>
    </section>
  );
};

Section.craft = {
  displayName: "Section",
  rules: {
    canDrop: () => true,
  },
};
