"use client";

import { useEditor, useNode } from "@craftjs/core";
import { StyledColumnDiv } from "./styled-column-div";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  width?: number;
};

export const Column = ({ children, width }: Props) => {
  const cursorPosition = useRef<number>(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const {
    connectors: { connect },
    parentId,
    actions: { setProp },
    id,
    selected,
  } = useNode((node) => ({
    parentId: node.data.parent,
    selected: node.events.selected,
  }));
  const {
    parentNode,
    nodes,
    actions: { setProp: setPropNode },
    query: { node: getNode },
    enabled,
  } = useEditor((state) => ({
    parentNode: state.nodes[parentId!],
    nodes: state.nodes,
    enabled: state.options.enabled,
  }));

  const allColumns = nodes[parentId!].data.nodes;

  const index = allColumns.findIndex((node) => node === id);

  const isFirst = index === 0;

  const isLast = index === allColumns.length - 1;

  const onResize = useCallback(
    (move: number) => {
      const nearItemId = allColumns[index + (direction === "left" ? -1 : 1)];

      const node1 = getNode(id).get()?.data.props.width ?? 0;
      const node2 = getNode(nearItemId).get()?.data.props.width ?? 0;

      const percentPerMove = move > 0 ? move : -move;

      if ((node1 + move < 0 || node2 - move < 0) && direction === "left")
        return;

      if ((node1 - move < 0 || node2 + move < 0) && direction === "right")
        return;

      setProp((props: any) => {
        if (
          (move < 0 && direction === "right") ||
          (move > 0 && direction === "left")
        ) {
          props.width = parseFloat((props.width + percentPerMove).toFixed(2));
        } else {
          props.width = parseFloat((props.width - percentPerMove).toFixed(2));
        }
      });

      setPropNode(nearItemId, (props) => {
        if (
          (move < 0 && direction === "right") ||
          (move > 0 && direction === "left")
        ) {
          props.width = parseFloat((props.width - percentPerMove).toFixed(2));
        } else {
          props.width = parseFloat((props.width + percentPerMove).toFixed(2));
        }
      });
    },
    [setProp, setPropNode, index, allColumns, direction, id, getNode]
  );

  useEffect(() => {
    if (!enabled) return;
    const iframe = document.querySelector("iframe")!.contentWindow!.window;
    const fn = (e: MouseEvent) => {
      setDirection(null);
    };

    const fnMove = (e: MouseEvent) => {
      const diff = cursorPosition.current - e.clientX;
      const width = iframe.innerWidth;

      const value = parseFloat(((diff / width) * 100).toFixed(2));

      cursorPosition.current = e.clientX;

      onResize(value);
    };

    if (direction) {
      iframe.addEventListener("mouseup", fn, true);
      iframe.addEventListener("mousemove", fnMove, true);
    } else {
      iframe.removeEventListener("mouseup", fn, true);
      iframe.removeEventListener("mousemove", fnMove, true);
    }

    return () => {
      if (!enabled) return;
      iframe.removeEventListener("mouseup", fn, true);
      iframe.removeEventListener("mousemove", fnMove, true);
    };
  }, [direction, setDirection, onResize, enabled]);

  return (
    <StyledColumnDiv
      ref={(ref) => {
        connect(ref!);
      }}
      $gap={parentNode.data.props.columnGap}
      $columnsCount={parentNode.data.nodes.length}
      className={cn("p-4 relative", !!direction && "select-none")}
      $width={width}
    >
      {children}
      {!isFirst && enabled && selected && (
        <div
          className={cn(
            "absolute h-full w-1 top-0 right-full translate-x-1/2 cursor-col-resize after:absolute after:size-3 after:top-1/2 after:bg-black after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full",
            direction === "left" ? "bg-black" : "bg-transparent"
          )}
          onMouseDown={(e) => {
            setDirection("left");
            cursorPosition.current = e.clientX;
          }}
        />
      )}
      {!isLast && enabled && selected && (
        <div
          className={cn(
            "absolute h-full w-1 top-0 left-full -translate-x-1/2 cursor-col-resize after:absolute after:size-3 after:top-1/2 after:bg-black after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full",
            direction === "right" ? "bg-black" : "bg-transparent"
          )}
          onMouseDown={(e) => {
            setDirection("right");
            cursorPosition.current = e.clientX;
          }}
        />
      )}
      {!!direction && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 bg-black text-white p-1 text-xs rounded-md",
            direction === "left" ? "left-2" : "right-2"
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
