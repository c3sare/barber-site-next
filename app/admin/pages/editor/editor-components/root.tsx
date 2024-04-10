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
      className="mx-auto w-full max-w-7xl pb-4"
    >
      {children}
    </div>
  );
};
