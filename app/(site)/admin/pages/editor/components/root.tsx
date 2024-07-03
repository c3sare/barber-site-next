"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Root = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mx-auto w-full max-w-7xl px-4 py-8 h-full", className)} {...props}>
        {children}
      </div>
    );
  }
);

Root.displayName = "Root";
