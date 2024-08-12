import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export type BorderRadiusType = {
  topLeft?: SingleWidthType;
  topRight?: SingleWidthType;
  bottomLeft?: SingleWidthType;
  bottomRight?: SingleWidthType;
};

export const getBorderRadius = (borderRadius?: BorderRadiusType) => {
  if (!borderRadius) return "";

  const topLeft = borderRadius?.topLeft
    ? calculateWithMetrics(borderRadius.topLeft)
    : "0px";
  const topRight = borderRadius?.topRight
    ? calculateWithMetrics(borderRadius.topRight)
    : "0px";
  const bottomLeft = borderRadius?.bottomLeft
    ? calculateWithMetrics(borderRadius.bottomLeft)
    : "0px";
  const bottomRight = borderRadius?.bottomRight
    ? calculateWithMetrics(borderRadius.bottomRight)
    : "0px";

  return `border-radius: ${topLeft} ${topRight} ${bottomRight} ${bottomLeft};`;
};
