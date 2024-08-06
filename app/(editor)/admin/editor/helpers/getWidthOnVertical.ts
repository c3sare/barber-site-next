import { Devices } from "../editor-components/toolbar-elements/types";

export const getWidthOnVertical = (
  device: Devices,
  verticalOn: Devices | undefined,
  halfOn?: Devices
) =>
  verticalOn === device
    ? `width: 100% !important;`
    : `${halfOn === device ? `width: 50% !important;` : ""}`;
