"use client";

import { cn } from "@/lib/utils";
import { EllipsisVerticalIcon } from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Resizable } from "re-resizable";
import { useEditorContext } from "../_ctx/editor-context";

type Props = React.DetailedHTMLProps<
  React.IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
>;

const Handle = forwardRef<
  HTMLDivElement,
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { handleAxis: string }
>((props, ref) => {
  const { handleAxis, className, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={cn(
        `handle-${handleAxis} absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-move`,
        className
      )}
      {...restProps}
    >
      <EllipsisVerticalIcon />
    </div>
  );
});

Handle.displayName = "Handle";

const Iframe = ({ children, ref, className, ...props }: Props) => {
  const { currentOpenBar, frameWidth, setFrameWidth } = useEditorContext();
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const containerRef = useRef<Resizable>(null);
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const fn = () => {
      const container = containerRef.current;
      console.log("execute");

      if (container) {
        const maxWidth = container.parentNode!.clientWidth;
        console.log({ maxWidth });
        setMaxWidth(maxWidth - 16);
      }
    };
    fn();

    window.addEventListener("resize", fn, true);

    return () => {
      window.removeEventListener("resize", fn, true);
    };
  }, [currentOpenBar]);

  useEffect(() => {
    const head = document.querySelector("head");
    const classes = document.body.classList.toString();
    const content = head?.innerHTML;

    if (content && contentRef) {
      contentRef.contentWindow!.document.head.innerHTML = content;
    }

    if (contentRef?.contentWindow?.document.body) {
      contentRef?.contentWindow?.document.body.classList.add(
        ...classes.split(" ")
      );
    }
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

  return (
    <Resizable
      className="relative mx-auto !h-full max-w-[calc(100%-16px)]"
      size={{ width: frameWidth, height: 0 }}
      maxWidth={maxWidth}
      onResize={onResize}
      resizeRatio={2}
      minWidth={250}
      enable={{ right: true }}
      handleStyles={{
        right: {
          cursor: "move",
          position: "absolute",
          top: "50%",
          translate: "translateY(-50%)",
          right: "0px",
          height: "24px",
          width: "24px",
        },
      }}
      handleComponent={{
        right: <EllipsisVerticalIcon />,
      }}
      ref={containerRef}
    >
      <iframe
        className={cn("relative w-full h-full", className)}
        ref={(refx) => {
          setContentRef(refx);
        }}
        {...props}
      >
        {mountNode && createPortal(<>{children}</>, mountNode)}
      </iframe>
    </Resizable>
  );
};

export default Iframe;
