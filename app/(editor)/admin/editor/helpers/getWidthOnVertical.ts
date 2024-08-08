import {
  Devices,
  SingleWidthType,
} from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export const getWidthOnVertical = (
  device: Devices,
  verticalOn: Devices | undefined,
  halfOn: Devices | undefined,
  gap: SingleWidthType | undefined
) => {
  const result =
    verticalOn === device
      ? `width: 100% !important;`
      : halfOn === device
      ? `width: ${
          gap ? `calc(50% - (${calculateWithMetrics(gap)} / 2))` : "50%"
        } !important;`
      : "";

  return result;
};
