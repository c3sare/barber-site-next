"use client";

import { cn } from "@/lib/utils";
import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import { ArrowUpIcon, MoveIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useRef, useCallback, useState } from "react";
import ReactDOM from "react-dom";

export const RenderNode = ({
  render,
}: {
  render: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });
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
      if (isActive || isHover) {
        dom.classList.remove("border-transparent");
        dom.classList.add("border-gray-500");
      } else {
        dom.classList.remove("border-gray-500");
        dom.classList.add("border-transparent");
      }
    }
  }, [dom, isActive, isHover]);

  useEffect(() => {
    const fn = () => {
      setPosition({
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
      })
    }

    window.addEventListener("scroll", fn, true);
    window.addEventListener("resize", fn, true);

    return () => {
      window.removeEventListener("resize", fn, true);
    }
  })

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${(top > 0 ? top : bottom) + position.y}px`,
      left: `${left + position.x}px`,
    };
  }, [position]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
          <div
            ref={(ref) => {
              currentRef.current = ref!;
            }}
            className={cn("h-[30px] mt-[-29px] text-xs leading-3 border border-gray-500 border-b-transparent &>svg:fill-[#fff] &>svg:size-[15px] px-2 py-2 text-white bg-gray-400 absolute flex items-center z-[1]", name.toLowerCase() === "root" && "hidden")}
            style={{
              left: getPos(dom!).left,
              top: getPos(dom!).top,
            }}
          >
            <h2 className="flex-1 mr-4">{name}</h2>
            {
              moveable ? (
                <button
                  className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 mr-2 cursor-move"
                  ref={(ref) => {
                    drag(ref!);
                  }}
                >
                  <MoveIcon className="size-4" />
                </button >
              ) : null}
            {
              id !== ROOT_NODE && (
                <button
                  className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent!);
                  }}
                >
                  <ArrowUpIcon className="size-4" />
                </button>
              )
            }
            {
              deletable ? (
                <button
                  className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Trash2Icon className="size-4" />
                </button>
              ) : null
            }
          </div >,
          document.querySelector("body")!
        )
        : null}
      {render}
    </>
  );
};
