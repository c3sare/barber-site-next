import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export const calculateColumnWidth = (width?: number, gap?: SingleWidthType) =>
  width
    ? `width: ${
        gap ? `calc(${width}% - ${calculateWithMetrics(gap)})` : `${width}%`
      } !important;`
    : "";
