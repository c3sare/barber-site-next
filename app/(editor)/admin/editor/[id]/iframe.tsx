"use client";

import { cn } from "@/lib/utils";
import { EllipsisVerticalIcon } from "lucide-react";
import React, { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

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
  const [width, setWidth] = useState(1000);
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

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
    { size }: { size: { width: number; height: number } }
  ) => {
    setWidth(size.width);
  };

  return (
    <ResizableBox
      className="relative mx-auto !h-full max-w-full"
      width={width}
      height={0}
      minConstraints={[0, 250]}
      onResize={onResize}
      handle={(handleAxis, ref) => <Handle handleAxis={handleAxis} ref={ref} />}
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
    </ResizableBox>
  );
};

export default Iframe;
