"use client";

import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import { useEditorContext } from "../_ctx/editor-context";
import { EllipsisVerticalIcon } from "lucide-react";
import { useEditor } from "@craftjs/core";
import { ScaleBox } from "./scale-box";

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
    <div className="flex-1 m-2 z-10">
      <Resizable
        className="relative mx-auto !h-full -z-[1] bg-background"
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
        <ScaleBox maxWidth={maxWidth}>{children}</ScaleBox>
        {isResizing && (
          <span className="absolute block text-white text-xs bg-black/50 rounded-sm p-1 right-1 top-1/2 -translate-y-1/2 z-10">
            {frameWidth}px
          </span>
        )}
      </Resizable>
    </div>
  );
};
