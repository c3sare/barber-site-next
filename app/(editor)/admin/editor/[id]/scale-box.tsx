"use client";

import { useEffect, useRef } from "react";
import { useEditorContext } from "../_ctx/editor-context";

type Props = {
  children: React.ReactNode;
  maxWidth: number;
};

export const ScaleBox = ({ children, maxWidth }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { frameWidth } = useEditorContext();

  useEffect(() => {
    const calculatedScale = maxWidth / frameWidth;

    ref.current!.style.transform = `scale(${
      calculatedScale > 1 ? 1 : calculatedScale
    })`;
  }, [frameWidth, maxWidth]);

  return (
    <div
      ref={ref}
      className="h-full"
      style={{ width: "inherit", transformOrigin: "top left" }}
    >
      {children}
    </div>
  );
};
