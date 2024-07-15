"use client";

import { Frame, Element, SerializedNodes } from "@craftjs/core";
import { Root } from "../editor-components/root";

type Props = {
  data?: string | SerializedNodes;
};

export const Content = ({ data }: Props) => {
  return (
    <Frame data={data}>
      <Element data-cy="root" is={Root} canvas />
    </Frame>
  );
};
