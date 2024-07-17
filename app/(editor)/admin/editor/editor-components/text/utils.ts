import { SingleWidthType } from "./types/text-type";

export const getWidth = (width: SingleWidthType) => {
  if (width?.metric === "auto") return "auto";
  if (width?.metric === "custom") return width.value ?? "100%";

  if (!width?.value || !width?.metric) return "100%";

  return `${width.value}${width.metric}`;
};
