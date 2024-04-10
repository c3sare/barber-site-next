"use client";

import { Button as ButtonShadcn } from "@/components/ui/button";
import { useNode } from "@craftjs/core";

type Props = {
  text: string;
};

export const Button = ({ text }: Props) => {
  const {
    connectors: { connect },
  } = useNode<HTMLButtonElement>();

  return (
    <ButtonShadcn
      ref={(ref) => {
        connect(ref!);
      }}
    >
      {text}
    </ButtonShadcn>
  );
};
