"use client";

import { useNode } from "@craftjs/core";
import { Container as ContainerRO } from "../components/container";

type Props = {
  children?: React.ReactNode;
};

export const Container = ({ children, ...props }: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <ContainerRO
      ref={(ref) => {
        connect(ref!);
      }}
      {...props}
    >
      {children}
    </ContainerRO>
  );
};
