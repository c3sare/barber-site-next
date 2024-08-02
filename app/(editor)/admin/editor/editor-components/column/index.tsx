"use client";

import { useEditor, useNode } from "@craftjs/core";
import { StyledColumnDiv } from "./styled-column-div";
import { ResizeCallback } from "re-resizable";
import { useCallback } from "react";

type Props = {
  children?: React.ReactNode;
  width?: number;
};

export const Column = ({ children, width, ...props }: Props) => {
  const {
    nodes,
    enabledEditor,
    actions: { setProp: setPropNode },
  } = useEditor((state) => ({
    nodes: state.nodes,
    enabledEditor: state.options.enabled,
  }));
  const {
    connectors: { connect },
    actions: { setProp },
    parent,
    id,
  } = useNode((node) => ({
    parent: node.data.parent,
  }));

  const allColumns = nodes[parent!].data.nodes;

  const index = allColumns.findIndex((node) => node === id);

  const isFirst = index === 0;

  const isLast = index === allColumns.length - 1;

  const onResize: ResizeCallback = useCallback(
    (event: any, direction, ref, delta) => {
      console.log(event, direction, ref, delta);

      const nearItemId = allColumns[index + (direction === "left" ? -1 : 1)];

      setProp((props: any) => {
        if (
          (event.movementX > 0 && direction === "right") ||
          (event.movementX < 0 && direction === "left")
        ) {
          if (nodes[nearItemId]!.dom!.clientWidth! <= 32) return;
          props.width = parseFloat((props.width + 0.1).toFixed(2));
        } else {
          props.width = parseFloat((props.width - 0.1).toFixed(2));
        }
      });

      setPropNode(nearItemId, (props) => {
        if (
          (event.movementX > 0 && direction === "right") ||
          (event.movementX < 0 && direction === "left")
        ) {
          if (nodes[nearItemId]!.dom!.clientWidth! <= 32) return;
          props.width = parseFloat((props.width - 0.1).toFixed(2));
        } else {
          props.width = parseFloat((props.width + 0.1).toFixed(2));
        }
      });
    },
    [setProp, setPropNode, index, allColumns, nodes]
  );

  return (
    <StyledColumnDiv
      ref={(ref) => {
        connect(ref?.resizable!);
      }}
      enable={{
        left: !isFirst && enabledEditor,
        right: !isLast && enabledEditor,
      }}
      size={{ width: `auto`, height: "auto" }}
      className="min-h-[200px] p-4 w-full"
      $width={width}
      minWidth="32px"
      onResize={onResize}
      {...props}
    >
      {children}
    </StyledColumnDiv>
  );
};

Column.craft = {
  displayName: "Column",
  rules: {
    canDrop: (props: any) => {
      if (props.data.name === "Columns") return true;
      return false;
    },
  },
};
