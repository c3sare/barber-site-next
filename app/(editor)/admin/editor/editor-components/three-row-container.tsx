"use client";

import { Element, useNode } from "@craftjs/core";
import { Container } from "./container";
import { cn } from "@/lib/utils";

type Props = {
  variant?: 1 | 2;
};

export const ThreeRowContainer = ({ variant = 1 }: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  const variants = {
    1: "md:[&>div]:w-1/3",
    2: "md:[&>div:first-child_&>div:last-child]:w-1/4 [&>div:nth-child(2)]:w-1/2",
  };

  return (
    <div
      ref={(ref) => {
        connect(ref!);
      }}
      className={cn("flex w-full flex-nowrap gap-2", variants[variant])}
    >
      <Element id="container_1" is={Container} canvas />
      <Element id="container_2" is={Container} canvas />
      <Element id="container_3" is={Container} canvas />
    </div>
  );
};
