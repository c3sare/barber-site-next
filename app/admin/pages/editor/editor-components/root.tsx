"use client";

import { useNode } from "@craftjs/core";
import React from "react";
import { Root as RootRO } from "../components/root";

type Props = {
  children?: React.ReactNode;
};

export const Root = ({ children }: Props) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <RootRO
      ref={(ref) => {
        connect(ref!);
      }}
    >
      {children}
    </RootRO>
  );
};
