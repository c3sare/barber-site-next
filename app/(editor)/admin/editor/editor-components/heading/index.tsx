"use client";

import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { TextToolbar, alignItems, tags } from "./toolbar";

type Props = {
  text?: string;
  fontSize?: number;
  htmlTag?: (typeof tags)[number];
  align?: (typeof alignItems)[number]["value"];
  color?: string;
  bold?: boolean;
  italic?: boolean;
};

export const Text = ({
  text = "Text",
  fontSize = 24,
  htmlTag: Tag = "p",
  align = "left",
  color = "#000000",
  bold = false,
  italic = false,
}: Props) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  return (
    <Tag
      ref={(ref) => {
        connect(ref!);
      }}
      className={cn(aligns[align], bold && "font-bold", italic && "italic")}
      style={{ fontSize: `${fontSize}px`, color }}
      onKeyUp={(e) => {
        setProp((props: { text: string }) => {
          props.text = e.currentTarget.innerText;
        });
      }}
      dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br/>") }}
    />
  );
};

Text.craft = {
  props: {
    fontSize: 24,
    htmlTag: "p",
    text: "Text",
    align: "left",
    color: "#000000",
    bold: false,
    italic: false,
  },
  related: {
    toolbar: TextToolbar,
  },
};
