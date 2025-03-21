"use client";

import { Resizable } from "re-resizable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useEditor } from "@craftjs/core";
import { useFrameDeviceSize } from "../stores/use-frame-device-size";
import { useEditorState } from "../stores/use-editor-state";

export const ResizeBox = ({ children }: React.PropsWithChildren) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const {
    actions: { selectNode },
  } = useEditor();
  const { currentOpenBar, isOpenLayersBar } = useEditorState();
  const { frameWidth, setFrameWidth, maxWidth, setMaxWidth } =
    useFrameDeviceSize();

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
      event: unknown,
      dir: unknown,
      ref: HTMLElement,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="flex-1 m-2 z-10 flex flex-col">
      <Resizable
        className="relative mx-auto !h-full flex-1 -z-[1] bg-background flex flex-col"
        size={{ width: frameWidth, height: "auto" }}
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
        {children}
        {isResizing && (
          <span className="absolute block text-white text-xs bg-black/50 rounded-xs p-1 right-1 top-1/2 -translate-y-1/2 z-10">
            {frameWidth}px
          </span>
        )}
      </Resizable>
    </div>
  );
};
