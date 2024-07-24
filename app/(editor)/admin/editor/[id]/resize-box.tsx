"use client";

import { Resizable } from "re-resizable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditorContext } from "../_ctx/editor-context";
import { EllipsisVerticalIcon } from "lucide-react";
import { useEditor } from "@craftjs/core";

export const ResizeBox = ({ children }: React.PropsWithChildren) => {
  const {
    actions: { selectNode },
  } = useEditor();
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
    setFrameWidth(window.innerWidth - 16);

    window.addEventListener("resize", fn, true);

    return () => {
      window.removeEventListener("resize", fn, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const calculatedMaxWidth = useMemo(
    () => maxWidth - (isOpenLayersBar ? 300 : 0) - (currentOpenBar ? 300 : 0),
    [currentOpenBar, isOpenLayersBar, maxWidth]
  );

  return (
    <div className="flex-1 m-2 z-10 flex flex-col max-h-full">
      <Resizable
        className="relative mx-auto !h-full flex-1 -z-[1] bg-background flex flex-col"
        size={{ width: frameWidth, height: 0 }}
        maxWidth={calculatedMaxWidth}
        onResizeStart={() => {
          selectNode();
          setIsResizing(true);
        }}
        onResize={onResize}
        onResizeStop={() => setIsResizing(false)}
        resizeRatio={2}
        minWidth={250}
        enable={{ right: true }}
        handleWrapperStyle={{ zIndex: "9999" }}
        handleStyles={{
          right: {
            cursor: "col-resize",
            position: "absolute",
            top: "50%",
            left: "100%",
            height: "24px",
            width: "12px",
            zIndex: "-1",
          },
        }}
        handleComponent={{
          right: (
            <>
              <EllipsisVerticalIcon className="relative right-2 -translate-y-1/2 size-6 -z-[1]" />
            </>
          ),
        }}
      >
        {children}
        {isResizing && (
          <span className="absolute block text-white text-xs bg-black/50 rounded-sm p-1 right-1 top-1/2 -translate-y-1/2 z-10">
            {frameWidth}px
          </span>
        )}
      </Resizable>
    </div>
  );
};
