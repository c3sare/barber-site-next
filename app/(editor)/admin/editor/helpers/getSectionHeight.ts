import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export const getSectionHeight = (
  height?: "fit-content" | "viewport" | "custom",
  customHeight?: SingleWidthType
) => {
  if (height === "fit-content" || !height) return "";

  if (height === "viewport") return "height: 100vh;";

  if (height === "custom")
    return `height: ${
      customHeight ? calculateWithMetrics(customHeight) : "fit-content"
    };`;
};
