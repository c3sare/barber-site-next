"use client";

import { useNode } from "@craftjs/core";

type Props = {
  children?: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        connect(drag(ref!));
      }}
      className="w-full min-h-16 bg-black"
    >
      {children}
    </div>
  );
};
