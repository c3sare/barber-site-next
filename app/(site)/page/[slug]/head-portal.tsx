"use client";

import { createPortal } from "react-dom";

const HeadPortal = ({ children }: { children?: React.ReactNode }) => {
  return createPortal(<>{children}</>, document.head);
};

export default HeadPortal;
