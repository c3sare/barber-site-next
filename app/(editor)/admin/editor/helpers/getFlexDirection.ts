import { Devices } from "../editor-components/toolbar-elements/types";

export const getFlexDirection = (
  at: Devices,
  verticalAt: Devices | undefined,
  reverseOrderAt: Devices | undefined
) =>
  at === verticalAt
    ? `flex-direction: ${at === reverseOrderAt ? "column-reverse" : "column"};`
    : `${at === reverseOrderAt ? `flex-direction: row-reverse;` : ""}`;
