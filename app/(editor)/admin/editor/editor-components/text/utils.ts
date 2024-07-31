import type { SingleWidthType } from "../toolbar-elements/types";

export const getWidth = (width: SingleWidthType | undefined) => {
  if (width?.metric === "auto") return "auto";
  if (width?.metric === "custom") return width.value ?? "100%";

  if (!width?.value || !width?.metric) return "100%";

  return `${width.value}${width.metric}`;
};
