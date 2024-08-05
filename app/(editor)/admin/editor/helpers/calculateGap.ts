import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWidth } from "./calculateWidth";

export const calculateColumnGap = (gap?: SingleWidthType) =>
  gap ? calculateWidth(gap) : "32px";
