import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export const getHeightVariant = (
  variant?: string,
  height?: SingleWidthType
) => {
  switch (variant) {
    case "expand-to-fill":
      return "height: 100%;";
    case "custom":
      return height?.value ? `height: ${calculateWithMetrics(height)};` : "";
    default:
      return "";
  }
};
