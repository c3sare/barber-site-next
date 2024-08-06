import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

const heading = ["h1", "h2", "h3", "h4", "h5", "h6"];

const isHeading = (tag?: string) => !!tag && heading.includes(tag);

const HeadingSize = (tag: (typeof heading)[number]) => {
  switch (tag) {
    case "h1":
      return Math.round(16 * 1.25 * 1.25 * 1.25 * 1.25 * 1.25);
    case "h2":
      return Math.round(16 * 1.25 * 1.25 * 1.25 * 1.25);
    case "h3":
      return Math.round(16 * 1.25 * 1.25 * 1.25);
    case "h4":
      return Math.round(16 * 1.25 * 1.25);
    case "h5":
      return Math.round(16 * 1.25);
    case "h6":
      return 16;
    default:
      return 16;
  }
};

export const getFontSize = (size: SingleWidthType | undefined, tag = "") =>
  size?.value
    ? `font-size: ${calculateWithMetrics(size)};`
    : isHeading(tag)
    ? `font-size: ${HeadingSize(tag)}px;`
    : "";

export const getFontWeight = (size: string | undefined, tag = "") =>
  size ? `font-weight: ${size};` : isHeading(tag) ? "font-weight: bold;" : "";
