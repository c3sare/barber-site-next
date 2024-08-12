import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export type PaddingType = {
  top?: SingleWidthType;
  bottom?: SingleWidthType;
  left?: SingleWidthType;
  right?: SingleWidthType;
};

export const getPadding = (padding?: PaddingType) => {
  if (!padding) return "";

  const top = padding?.top ? calculateWithMetrics(padding.top) : "0px";
  const bottom = padding?.bottom ? calculateWithMetrics(padding.bottom) : "0px";
  const left = padding?.left ? calculateWithMetrics(padding.left) : "0px";
  const right = padding?.right ? calculateWithMetrics(padding.right) : "0px";

  return `padding: ${top} ${right} ${bottom} ${left};`;
};
