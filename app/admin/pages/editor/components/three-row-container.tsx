"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = {
  children?: React.ReactNode;
  variant?: 1 | 2;
};

export const ThreeRowContainer = forwardRef<HTMLDivElement, Props>(
  ({ children, variant = 1, ...props }, ref) => {
    const variants = {
      1: "md:[&>div]:w-1/3",
      2: "md:[&>div:first-child_&>div:last-child]:w-1/4 [&>div:nth-child(2)]:w-1/2",
    };

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-nowrap gap-2", variants[variant])}
        {...props}
      >
        {children}
      </div>
    );
  }
);
