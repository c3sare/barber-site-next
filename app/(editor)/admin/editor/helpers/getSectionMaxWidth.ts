import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export const getSectionMaxWidth = (
  width?: "contained" | "full" | "custom",
  customWidth?: SingleWidthType
) => {
  if (width === "contained" || !width) return "max-width: 1120px;";

  if (width === "full") return "";

  return customWidth
    ? `max-width: ${calculateWithMetrics(customWidth)};`
    : "max-width: 1120px;";
};
