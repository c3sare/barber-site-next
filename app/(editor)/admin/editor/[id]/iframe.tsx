"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";

type Props = React.DetailedHTMLProps<
  React.IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
>;

const Iframe = ({ children, ref, className, ...props }: Props) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (frameRef.current?.contentWindow?.document) {
      frameRef.current.contentWindow.document.head.innerHTML +=
        document.head.innerHTML;
      frameRef.current.contentWindow.document.body.className =
        document.body.className
          .split(" ")
          .filter((item) => !["bg-background", "min-h-screen"].includes(item))
          .join(" ");
    }
  }, []);

  const initalContent = useMemo(
    () =>
      `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body class="${document.body.className}"><div id="root"></div></body></html>`,
    []
  );

  return (
    <Frame
      ref={frameRef}
      initialContent={initalContent}
      className={cn("relative w-full", className)}
    >
      <FrameContextConsumer>
        {(frameContext) => (
          <StyleSheetManager target={frameContext.document!.head}>
            {children}
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </Frame>
  );
};

export default Iframe;
