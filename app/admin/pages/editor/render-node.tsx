"use client";

import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import { ArrowUpIcon, MoveIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";

export const RenderNode = ({
  render,
}: {
  render: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      dom.classList.add("border", "border-dashed", "border-transparent");
      if (isActive || isHover) dom.classList.add("border-gray-500");
      else dom.classList.remove("border-gray-500");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <div
              ref={(ref) => {
                currentRef.current = ref!;
              }}
              className="h-[30px] mt-[-29px] text-xs leading-3 &>svg:fill-[#fff] &>svg:size-[15px] px-2 py-2 text-white bg-gray-400 fixed flex items-center"
              style={{
                left: getPos(dom!).left,
                top: getPos(dom!).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                <button
                  className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 mr-2 cursor-move"
                  ref={(ref) => {
                    drag(ref!);
                  }}
                >
                  <MoveIcon className="size-4" />
                </button>
              ) : null}
              {id !== ROOT_NODE && (
                <button
                  className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent!);
                  }}
                >
                  <ArrowUpIcon className="size-4" />
                </button>
              )}
              {deletable ? (
                <button
                  className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Trash2Icon className="size-4" />
                </button>
              ) : null}
            </div>,
            document.querySelector("body")!
          )
        : null}
      {render}
    </>
  );
};
