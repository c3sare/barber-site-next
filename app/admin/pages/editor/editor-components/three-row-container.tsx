"use client";

import { Element, useNode } from "@craftjs/core";
import { Container } from "./container";

export const ThreeRowContainer = () => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      className="flex flex-nowrap gap-2"
      ref={(ref) => {
        connect(ref!);
      }}
    >
      <Element id="container_1" is={Container} canvas />
      <Element id="container_2" is={Container} canvas />
      <Element id="container_3" is={Container} canvas />
    </div>
  );
};
