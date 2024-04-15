"use client";

import { forwardRef } from "react";
import { Button as ButtonShadcn } from "@/components/ui/button";

type Props = {
  text: string;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ text, ...props }, ref) => {
    return (
      <ButtonShadcn ref={ref} {...props}>
        {text}
      </ButtonShadcn>
    );
  }
);
