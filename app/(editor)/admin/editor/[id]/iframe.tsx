"use client";

import { cn } from "@/lib/utils";
import { EllipsisVerticalIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Resizable } from "re-resizable";
import { useEditorContext } from "../_ctx/editor-context";
import { Frame, Element, SerializedNodes } from "@craftjs/core";
import { Root } from "@/app/(editor)/admin/editor/editor-components/root";

type Props = React.DetailedHTMLProps<
  React.IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
> & {
  data: SerializedNodes | undefined;
};

const Iframe = ({ children, ref, className, data, ...props }: Props) => {
  const {
    currentOpenBar,
    frameWidth,
    setFrameWidth,
    isOpenLayersBar,
    isResizing,
    setIsResizing,
  } = useEditorContext();
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const fn = () => {
      const maxWidth = window.innerWidth - 16;

      setMaxWidth(maxWidth);
    };
    fn();

    window.addEventListener("resize", fn, true);

    return () => {
      window.removeEventListener("resize", fn, true);
    };
  }, []);

  useEffect(() => {
    if (contentRef?.contentWindow?.document) {
      contentRef.contentWindow.document.body.className = document.body.className
        .split(" ")
        .filter((item) => !["bg-background", "min-h-screen"].includes(item))
        .join(" ");
    }
  }, [contentRef]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (contentRef?.contentWindow?.document)
            contentRef.contentWindow.document.head.innerHTML =
              document.head.innerHTML;
        }
      });
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [contentRef]);

  const mountNode = contentRef?.contentWindow?.document?.body;

  const onResize = (
    event: any,
    dir: any,
    ref: HTMLElement,
    size: { width: number; height: number }
  ) => {
    setFrameWidth(ref.clientWidth);
  };

  const calculatedMaxWidth =
    maxWidth - (isOpenLayersBar ? 300 : 0) - (currentOpenBar ? 300 : 0);

  return (
    <div className="flex-1 m-2">
      <Resizable
        className="relative mx-auto !h-full"
        size={{ width: frameWidth, height: 0 }}
        maxWidth={calculatedMaxWidth}
        onResize={onResize}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={() => setIsResizing(false)}
        resizeRatio={2}
        minWidth={250}
        enable={{ right: true }}
        handleStyles={{
          right: {
            cursor: "move",
            position: "absolute",
            top: "50%",
            left: "100%",
            height: "24px",
            width: "12px",
          },
        }}
        handleComponent={{
          right: (
            <>
              <EllipsisVerticalIcon className="relative right-2 size-6" />
              {isResizing && (
                <span className="absolute text-xs bg-primary/30 rounded-lg px-1 right-full top-1/2 -translate-x-0.5 -translate-y-1/2">
                  {frameWidth}px
                </span>
              )}
            </>
          ),
        }}
      >
        <iframe
          className={cn("relative w-full h-full", className)}
          ref={(refx) => {
            setContentRef(refx);
          }}
          {...props}
        >
          {mountNode &&
            createPortal(
              <Frame data={data}>
                <Element data-cy="root" is={Root} canvas />
              </Frame>,
              mountNode
            )}
        </iframe>
      </Resizable>
    </div>
  );
};

export default Iframe;
