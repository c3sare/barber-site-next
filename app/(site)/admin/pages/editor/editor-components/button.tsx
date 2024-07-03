"use client";

import { Button as ButtonRO } from "../components/button";
import { useNode } from "@craftjs/core";

type Props = {
  text: string;
};

export const Button = (props: Props) => {
  const {
    connectors: { connect },
  } = useNode<HTMLButtonElement>();

  return (
    <ButtonRO
      ref={(ref) => {
        connect(ref!);
      }}
      {...props}
    />
  );
};
