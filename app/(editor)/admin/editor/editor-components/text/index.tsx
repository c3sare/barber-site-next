"use client";

import { useEditor, useNode } from "@craftjs/core";
import { TextToolbar } from "./toolbar";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  text?: string;
  width?: {
    value?: string;
    metric?: "px" | "em" | "rem" | "vw" | "vh" | "auto" | "custom";
  };
};

const defaultProps: Props = {
  text: "This is a basic text element.",
  width: {
    metric: "px",
  },
};

type WidthType = Props["width"];

const getWidth = (width: WidthType) => {
  if (width?.metric === "auto") return "auto";
  if (width?.metric === "custom") return width.value ?? "100%";

  if (!width?.value || !width?.metric) return "100%";

  return `${width.value}${width.metric}`;
};

const Div = styled("div")<{ $width: WidthType }>`
  width: ${(props) => getWidth(props.$width)};
`;

export const Text = ({ text, width } = defaultProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  useEffect(() => {
    if (!isFocused) ref!.current!.innerText = text!;
  }, [text, isFocused]);

  return (
    <Div
      $width={width}
      ref={(refx) => {
        ref.current = refx!;
        connect(refx!);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="block whitespace-pre-line max-w-full"
      contentEditable={enabled ? "true" : "false"}
      onInput={(e) => {
        setProp((props: { text: string }) => {
          const text = e.currentTarget.innerText;

          props.text = text;
        });
      }}
    />
  );
};

Text.craft = {
  props: defaultProps,
  related: {
    toolbar: TextToolbar,
  },
};
