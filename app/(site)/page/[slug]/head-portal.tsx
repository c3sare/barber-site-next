"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function HeadPortal({ children }: React.PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && typeof window !== "undefined"
    ? createPortal(<>{children}</>, document.head)
    : null;
}
