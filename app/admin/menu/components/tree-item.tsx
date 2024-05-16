"use client";

import React, { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, GripVertical, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: UniqueIdentifier;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    return (
      <li
        className={cn(
          "list-none mb-[-1px]",
          clone && "inline-block pointer-events-none p-0 pl-[10px] pt-[5px]",
          ghost &&
            "before:absolute before:-left-2 before:-top-1 before:contents before:size-3 before:rounded-full before:border before:border-[#2389ff] before:bg-white",
          indicator && "opacity-100 relative z-[1] mb-[-1px]",
          disableSelection && "select-none",
          disableInteraction && "pointer-events-none"
        )}
        ref={wrapperRef}
        style={
          {
            "margin-left": `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          className="relative flex items-center py-[10px] px-[10px] bg-white border border-[#dedede] text-[#222]"
          ref={ref}
          style={style}
        >
          <Button variant="ghost" className="px-1 cursor-move" {...handleProps}>
            <GripVertical className="size-4 text-slate-500" />
          </Button>
          {onCollapse && (
            <Button variant="ghost" onClick={onCollapse}>
              <ChevronDown className="size-4 text-slate-500" />
            </Button>
          )}
          <span className="flex-grow pl-2 whitespace-nowrap text-ellipsis overflow-hidden">
            {value}
          </span>
          {!clone && onRemove && (
            <Button variant="ghost" onClick={onRemove}>
              <Trash2Icon className="size-4 text-slate-500" />
            </Button>
          )}
          {clone && childCount && childCount > 1 ? (
            <span className="absolute top-[-10px] right-[-10px] flex items-center justify-center size-6 font-semibold text-white">
              {childCount}
            </span>
          ) : null}
        </div>
      </li>
    );
  }
);

TreeItem.displayName = "TreeItem";
