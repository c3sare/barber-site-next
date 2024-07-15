"use client";

import { useEditorContext } from "@/app/(editor)/admin/editor/_ctx/editor-context";
import { cn } from "@/lib/utils";
import { useNode, useEditor, Node } from "@craftjs/core";
import { getRandomId, ROOT_NODE } from "@craftjs/utils";
import { ArrowUpIcon, CopyIcon, MoveIcon, Trash2Icon } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useDeferredValue,
  useMemo,
} from "react";
import ReactDOM from "react-dom";

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
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    node: node,
    props: node.data.props,
  }));

  const defferedFrameWidth = useDeferredValue(frameWidth);

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom && name.toLowerCase() !== "root") {
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
    const fn = () => {
      setPosition({
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
      });
    };
    fn();

    window.addEventListener("scroll", fn, true);
    window.addEventListener("resize", fn, true);

    return () => {
      window.removeEventListener("scroll", fn, true);
      window.removeEventListener("resize", fn, true);
    };
  }, [defferedFrameWidth]);

  const getPos = useCallback(
    (dom: HTMLElement) => {
      const { top, left, bottom } = dom
        ? dom.getBoundingClientRect()
        : { top: 0, left: 0, bottom: 0 };
      return {
        top: `${(top > 0 ? top : bottom) + position.y}px`,
        left: `${left + position.x}px`,
      };
    },
    [position]
  );

  const copyNode = useCallback(
    (node: Node, newId: string) => {
      const newNode: Node = {
        ...node,
        id: newId,
        events: {
          dragged: false,
          hovered: false,
          selected: false,
        },
      };
      return query.parseFreshNode(newNode).toNode();
    },
    [query]
  );

  const duplicateNode = useCallback(
    (node: Node, parentId: string, index?: number) => {
      if (!node || !parentId) return;
      const newId = getRandomId();
      const newNode = copyNode(node, newId);
      newNode.data.nodes = [];
      actions.history.throttle().add(newNode, parentId, index);
      node.data.nodes.forEach((childNodeId) => {
        const childNode = query.node(childNodeId).get();
        const newChildNode = copyNode(childNode, getRandomId());
        duplicateNode(newChildNode, newId);
      });
    },
    [actions.history, copyNode, query]
  );

  const style = useMemo(
    () => ({
      left: getPos(dom!).left,
      top: getPos(dom!).top,
    }),
    [dom, getPos]
  );

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <div
              ref={(ref) => {
                currentRef.current = ref!;
              }}
              className={cn(
                "h-[30px] mt-[-29px] text-xs leading-3 border border-gray-500 border-b-transparent &>svg:fill-[#fff] &>svg:size-[15px] px-2 py-2 text-white bg-gray-400 absolute flex items-center z-[1]",
                name.toLowerCase() === "root" && "hidden"
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

                      duplicateNode(node, parent!);
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
