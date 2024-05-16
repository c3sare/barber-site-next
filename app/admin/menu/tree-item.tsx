import React, { forwardRef, HTMLAttributes } from "react";

import { Handler } from "./handler";
import styles from "./TreeItem.module.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2Icon } from "lucide-react";

export interface Props extends HTMLAttributes<HTMLLIElement> {
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
  value: string;
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
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        )}
        ref={wrapperRef}
        style={
          {
            "--spacing": `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={styles.TreeItem} ref={ref} style={style}>
          <Handler {...handleProps} />
          {onCollapse && (
            <Button
              variant="ghost"
              onClick={onCollapse}
              className={cn(styles.Collapse, collapsed && styles.collapsed)}
            >
              <ChevronDown className="size-4 text-slate-500" />
            </Button>
          )}
          <span className={styles.Text}>{value}</span>
          {!clone && onRemove && (
            <Button onClick={onRemove}>
              <Trash2Icon />
            </Button>
          )}
          {clone && childCount && childCount > 1 ? (
            <span className={styles.Count}>{childCount}</span>
          ) : null}
        </div>
      </li>
    );
  }
);

TreeItem.displayName = "TreeItem";
