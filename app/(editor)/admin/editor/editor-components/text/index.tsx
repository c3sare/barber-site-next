"use client";

import { useEditor, useNode } from "@craftjs/core";
import { TextToolbar } from "./toolbar";
import { useEffect, useRef, useState } from "react";
import { StyledTextDiv } from "./styled-text-div";
import { defaultTextProps } from "./default-props";

export const Text = ({
  text,
  width,
  fontSize,
  marginBottom,
  marginTop,
  weight,
  align,
  color,
  font,
} = defaultTextProps) => {
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
    <StyledTextDiv
      $width={width}
      $fontSize={fontSize}
      $marginBottom={marginBottom}
      $marginTop={marginTop}
      $weight={weight}
      $align={align}
      $color={color}
      $font={font}
      ref={(refx) => {
        ref.current = refx!;
        connect(refx!);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="block whitespace-pre-line max-w-full outline-none"
      contentEditable={enabled ? "plaintext-only" : "false"}
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
  props: defaultTextProps,
  related: {
    toolbar: TextToolbar,
  },
};
