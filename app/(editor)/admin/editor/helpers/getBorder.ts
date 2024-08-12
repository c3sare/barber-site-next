import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

type Border = {
  width?: SingleWidthType;
  color?: string;
  style?: "solid" | "dashed" | "dotted" | "none";
};

export type BorderType = {
  top?: Border;
  right?: Border;
  bottom?: Border;
  left?: Border;
};

export const getBorder = (border?: BorderType) => {
  if (!border) return "";

  const keys = Object.keys(border) as Array<keyof typeof border>;

  const properties: string[] = [];

  for (const key of keys) {
    const item = border[key];

    const width = item?.width ? calculateWithMetrics(item.width) : "1px";
    const color = item?.color ? item.color : "#000000";
    const style = item?.style ? item.style : "solid";

    properties.push(`border-top: ${width} ${style} ${color};`);
  }

  return properties.join("");
};
