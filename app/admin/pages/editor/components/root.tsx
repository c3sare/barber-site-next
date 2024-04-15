"use client";

import { forwardRef } from "react";

type Props = {
  children?: React.ReactNode;
};

export const Root = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className="mx-auto w-full max-w-7xl py-8" {...props}>
        {children}
      </div>
    );
  }
);
