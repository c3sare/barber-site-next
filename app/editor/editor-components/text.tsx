"use client";

import { useEditor, useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";

type Props = {
  text: string;
  fontSize: number;
};

export const Text = ({ text, fontSize }: Props) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  return (
    <ContentEditable
      innerRef={connect}
      disabled={!enabled}
      html={text}
      onChange={(e) =>
        setProp(
          (props: any) =>
            (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
        )
      }
      tagName="p"
      style={{ fontSize: `${fontSize}px`, color: "white" }}
    />
  );
};
