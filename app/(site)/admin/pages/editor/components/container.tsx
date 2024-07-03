"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={cn("w-full min-h-16", className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
