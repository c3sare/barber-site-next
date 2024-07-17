"use client";

import { Resizable } from "re-resizable";
import { useCallback, useEffect, useState } from "react";
import { useEditorContext } from "../_ctx/editor-context";
import { EllipsisVerticalIcon } from "lucide-react";

export const ResizeBox = ({ children }: React.PropsWithChildren) => {
  const {
    currentOpenBar,
    frameWidth,
    setFrameWidth,
    isOpenLayersBar,
    isResizing,
    setIsResizing,
  } = useEditorContext();
  const [maxWidth, setMaxWidth] = useState<number>(0);

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

  const onResize = useCallback(
    (
      event: any,
      dir: any,
      ref: HTMLElement,
      size: { width: number; height: number }
    ) => {
      setFrameWidth(ref.clientWidth);
    },
    [setFrameWidth]
  );

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
        {children}
      </Resizable>
    </div>
  );
};
