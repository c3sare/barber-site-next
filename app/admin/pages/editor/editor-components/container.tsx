"use client";

import { useNode } from "@craftjs/core";

type Props = {
  children?: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        connect(ref!);
      }}
      className="w-full min-h-16"
    >
      {children}
    </div>
  );
};
