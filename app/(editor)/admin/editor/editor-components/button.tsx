"use client";

import { Button as ButtonRO } from "@/components/ui/button";
import { useNode } from "@craftjs/core";

type Props = {
  text: string;
};

export const Button = ({ text }: Props) => {
  const {
    connectors: { connect },
  } = useNode<HTMLButtonElement>();

  return (
    <ButtonRO
      ref={(ref) => {
        connect(ref!);
      }}
    >
      {text}
    </ButtonRO>
  );
};
