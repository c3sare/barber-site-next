"use client";

import { SerializedNodes } from "@craftjs/core";
import { createPortal } from "react-dom";
import { useFonts } from "../_ctx/fonts-context";
import { useEffect, useMemo } from "react";

type Props = {
  data?: SerializedNodes;
};

const getFonts = (data: SerializedNodes | undefined, usedFonts: string[]) => {
  if (!data) return usedFonts;
  const keys = Object.keys(data);
  const fontName: string[] = [];
  for (const key of keys) {
    const node = data[key];

    if (node.props?.font) {
      const sizes = Object.keys(node.props.font);
      for (const size of sizes) {
        const font = node.props.font[size];
        if (font) fontName.push(font);
      }
    }
  }

  const fonts = [...fontName, ...usedFonts];

  return fonts.filter((item, index) => fonts.indexOf(item) === index);
};

const Fonts = ({ data }: Props) => {
  const { usedFonts, setUsedFonts } = useFonts();

  useEffect(() => {
    const fonts = getFonts(data, usedFonts);
    setUsedFonts(fonts);
  }, [data, usedFonts, setUsedFonts]);

  const iframe = document.querySelector("iframe")?.contentWindow?.document.head;

  return (
    !!iframe &&
    usedFonts.length > 0 &&
    createPortal(
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css?family=${usedFonts
          .map((item) => item.replaceAll(" ", "+"))
          .join("|")}&display=swap`}
      />,
      iframe
    )
  );
};

export default Fonts;
