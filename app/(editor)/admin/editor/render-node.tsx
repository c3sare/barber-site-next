"use client";

import { useEditorContext } from "@/app/(editor)/admin/editor/_ctx/editor-context";
import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import { ArrowUpIcon, CopyIcon, MoveIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useRef, useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { duplicateNode } from "./utils";
import { cn } from "@/lib/utils";

export const RenderNode = ({
  render,
}: {
  render: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  const { frameWidth, openBar } = useEditorContext();
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
    node,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    isMoving: node.events.dragged,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    node: node,
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
  }, [dom, isActive, isHover, name]);

  useEffect(() => {
    const iframe = document.querySelector("iframe")!.contentWindow;
    const fn = () => {
      setPosition({
        x: iframe?.scrollX || 0,
        y: iframe?.scrollY || 0,
        width: iframe?.innerWidth || 0,
      });
    };
    fn();

    iframe?.addEventListener("scroll", fn, true);
    iframe?.addEventListener("resize", fn, true);

    return () => {
      iframe?.removeEventListener("scroll", fn, true);
      iframe?.removeEventListener("resize", fn, true);
    };
  }, []);

  const getPos = useCallback(
    (dom: HTMLElement) => {
      const { top, left, bottom } = dom
        ? dom.getBoundingClientRect()
        : { top: 0, left: 0, bottom: 0 };

      const calculatedTop = (top > 30 ? top : bottom) + position.y;
      const calculatedLeft = left + position.x;
      return {
        top: `${calculatedTop}px`,
        left: `${calculatedLeft}px`,
      };
    },
    [position]
  );

  const pos = getPos(dom!);

  const style = {
    left: pos.left,
    top: pos.top,
  };

  return (
    <>
      {isActive
        ? ReactDOM.createPortal(
            <div
              ref={(ref) => {
                currentRef.current = ref!;
              }}
              className={cn(
                "h-[30px] mt-[-30px] text-xs leading-3 border border-gray-500 &>svg:fill-[#fff] &>svg:size-[15px] px-2 py-2 text-white bg-gray-400 absolute flex items-center z-[1]",
                name === "Root" && "hidden"
              )}
              style={style}
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
                    openBar("settings");
                  }}
                >
                  <ArrowUpIcon className="size-4" />
                </button>
              )}
              {deletable ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateNode(
                        actions.history.throttle().add,
                        query,
                        node,
                        parent!
                      );
                    }}
                    className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 mr-2 cursor-pointer"
                  >
                    <CopyIcon className="size-4" />
                  </button>
                  <button
                    className="p-0 opacity-90 flex items-center &>div:relative &>div:-top-1/2 &>div:-left-1/2 cursor-pointer"
                    onMouseDown={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      actions.delete(id);
                    }}
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </>
              ) : null}
            </div>,
            document.querySelector("iframe")!.contentWindow!.document.body
          )
        : null}
      {render}
    </>
  );
};
