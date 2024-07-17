"use client";

import { useNode } from "@craftjs/core";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Root = ({ children }: Props) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        connect(ref!);
      }}
      className="w-full"
    >
      {children}
    </div>
  );
};
