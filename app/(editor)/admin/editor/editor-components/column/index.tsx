"use client";

import { useEditor, useNode } from "@craftjs/core";
import { StyledColumnDiv } from "./styled-column-div";
import { ResizeCallback } from "re-resizable";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MultiDeviceWidthType } from "../toolbar-elements/types";

type Props = {
  children?: React.ReactNode;
  width?: number;
  gap?: MultiDeviceWidthType;
};

export const Column = ({ children, width, gap }: Props) => {
  const [resizeSide, setResizeSide] = useState<"left" | "right" | null>(null);
  const startWidth = useRef<number>(0);
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
    selected,
  } = useNode((node) => ({
    parent: node.data.parent,
    selected: node.events.selected,
  }));

  const allColumns = nodes[parent!].data.nodes;

  const index = allColumns.findIndex((node) => node === id);

  const isFirst = index === 0;

  const isLast = index === allColumns.length - 1;

  const onResize: ResizeCallback = useCallback(
    (event: any, direction, ref) => {
      const parentWidth = ref.parentElement!.clientWidth;

      const percentPerMove = parseFloat(
        (startWidth.current / parentWidth).toFixed(2)
      );

      const nearItemId = allColumns[index + (direction === "left" ? -1 : 1)];

      let stop = false;

      setProp((props: any) => {
        if (
          (event.movementX > 0 && direction === "right") ||
          (event.movementX < 0 && direction === "left")
        ) {
          if (nodes[nearItemId]!.dom!.clientWidth! <= 32) {
            stop = true;
            return;
          }
          props.width = parseFloat((props.width + percentPerMove).toFixed(2));
        } else {
          props.width = parseFloat((props.width - percentPerMove).toFixed(2));
        }
      });

      if (stop) return;

      setPropNode(nearItemId, (props) => {
        if (
          (event.movementX > 0 && direction === "right") ||
          (event.movementX < 0 && direction === "left")
        ) {
          if (nodes[nearItemId]!.dom!.clientWidth! <= 32) return;
          props.width = parseFloat((props.width - percentPerMove).toFixed(2));
        } else {
          props.width = parseFloat((props.width + percentPerMove).toFixed(2));
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
      onResizeStart={(e, direction, ref) => {
        startWidth.current = ref.clientWidth;
        setResizeSide(direction as "left" | "right");
      }}
      onResizeStop={() => {
        setResizeSide(null);
        startWidth.current = 0;
      }}
      enable={
        enabledEditor && selected
          ? {
              left: !isFirst,
              right: !isLast,
            }
          : false
      }
      size={{ width: `${width}%`, height: "auto" }}
      handleComponent={{
        right: (
          <div className="size-3 bg-black rounded-full absolute -right-[1px] top-1/2 -translate-y-1/2" />
        ),
        left: (
          <div className="size-3 bg-black rounded-full absolute -left-[1px] top-1/2 -translate-y-1/2" />
        ),
      }}
      $gap={gap}
      className="p-4"
      minWidth="32px"
      onResize={onResize}
    >
      {children}
      {!!resizeSide && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 p-1 bg-black text-white",
            resizeSide === "left" && "left-2",
            resizeSide === "right" && "right-2"
          )}
        >
          {width}%
        </div>
      )}
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
