import { SingleWidthType } from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export const getCalculatedProperty = (
  property: string,
  value?: SingleWidthType,
  defaultValue?: SingleWidthType
) =>
  value ?? defaultValue
    ? `${property}: ${calculateWithMetrics(value ?? defaultValue)};`
    : "";
