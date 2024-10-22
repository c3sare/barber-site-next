"use client";

import dynamic from "next/dynamic";
import { type SerializedNodes } from "@craftjs/core";
const Frame = dynamic(
  () => import("@craftjs/core").then((item) => item.Frame),
  { ssr: false }
);
const Element = dynamic(
  () => import("@craftjs/core").then((item) => item.Element),
  { ssr: false }
);
import { Root } from "../editor-components/root";

type Props = {
  data?: SerializedNodes;
};

export const Content = ({ data }: Props) => {
  return (
    <Frame data={data}>
      <Element data-cy="root" is={Root} canvas />
    </Frame>
  );
};
