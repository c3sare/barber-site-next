"use client";

import { useEditor, useNode } from "@craftjs/core";
import { HeadingToolbar } from "./toolbar";
import { useEffect, useRef, useState } from "react";
import { StyledTextDiv } from "../text/styled-text-div";
import { DeviceRecord, MultiDeviceWidthType } from "../toolbar-elements/types";

type HeadingType = {
  text?: string;
  width?: MultiDeviceWidthType;
  fontSize?: MultiDeviceWidthType;
  weight?: DeviceRecord<string>;
  marginTop?: MultiDeviceWidthType;
  marginBottom?: MultiDeviceWidthType;
  align?: DeviceRecord<string>;
  color?: DeviceRecord<string>;
  font?: DeviceRecord<string>;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Heading = ({
  text,
  width,
  fontSize,
  marginBottom,
  marginTop,
  weight,
  align,
  color,
  font,
  tag,
}: HeadingType) => {
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
  }, [text, isFocused, tag]);

  return (
    <StyledTextDiv
      as={tag ?? "h1"}
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

Heading.craft = {
  displayName: "Heading",
  related: {
    toolbar: HeadingToolbar,
  },
  props: {
    text: "This is a heading element...",
  },
};
