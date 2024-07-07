"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = React.DetailedHTMLProps<
  React.IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
>;

const Iframe = ({ children, ref, className, ...props }: Props) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const head = document.querySelector("head");
    const content = head?.innerHTML;

    if (content && contentRef) {
      contentRef.contentWindow!.document.head.innerHTML = content;
    }
  }, [contentRef]);

  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe
      className={cn("relative", className)}
      ref={(refx) => {
        setContentRef(refx);
      }}
      {...props}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default Iframe;
