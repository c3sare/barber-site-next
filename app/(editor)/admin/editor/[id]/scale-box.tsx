"use client";

import { useEffect, useRef } from "react";
import { useEditorContext } from "../_ctx/editor-context";

type Props = {
  children: React.ReactNode;
  maxWidth: number;
};

export const ScaleBox = ({ children, maxWidth }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { frameWidth, isOpenLayersBar, currentOpenBar } = useEditorContext();

  useEffect(() => {
    const width = ref.current?.parentElement?.clientWidth ?? 0;

    const calculatedScale = width / frameWidth;

    ref.current!.style.transform = `scale(${
      calculatedScale > 1 ? 1 : calculatedScale
    })`;
  }, [frameWidth, currentOpenBar, isOpenLayersBar, maxWidth]);

  return (
    <div
      ref={ref}
      className="h-full overflow-hidden"
      style={{ width: frameWidth + "px", transformOrigin: "top left" }}
    >
      {children}
    </div>
  );
};
