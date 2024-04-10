"use client";

import { useNode } from "@craftjs/core";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Root = ({ children }: Props) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        connect(drag(ref!));
      }}
      className="mx-auto w-full max-w-7xl"
    >
      {children}
    </div>
  );
};
