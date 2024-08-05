import type { SingleWidthType } from "../editor-components/toolbar-elements/types";

export const calculateWidth = (width: SingleWidthType | undefined) => {
  if (width?.metric === "auto") return "auto";
  if (width?.metric === "custom") return width.value ?? "auto";

  if (!width?.value || !width?.metric) return "100%";

  return `${width.value}${width.metric}`;
};
