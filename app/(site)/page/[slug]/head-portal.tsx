"use client";

import { createPortal } from "react-dom";

export const HeadPortal = ({ children }: { children?: React.ReactNode }) => {
  return createPortal(<>{children}</>, document.head);
};
