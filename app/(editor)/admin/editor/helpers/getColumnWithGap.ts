import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export const getColumnWidthWithGap = (
  gap?: SingleWidthType,
  columnCount?: number,
  width?: number
) => ({
  width: gap
    ? `calc(${width}% - (${calculateWithMetrics(gap)} * ${
        columnCount && columnCount > 1 ? columnCount - 1 : 0
      })/${columnCount || 1});`
    : width
      ? `${width}%`
      : "",
});
