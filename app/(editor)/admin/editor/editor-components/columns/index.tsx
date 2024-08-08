"use client";

import { useEditor, useNode } from "@craftjs/core";
import { StyledColumnsDiv } from "./styled-columns-div";
import {
  DeviceRecord,
  Devices,
  MultiDeviceWidthType,
} from "../toolbar-elements/types";
import { ColumnsToolbar } from "./toolbar";
import { useEffect, useRef } from "react";
import { ColumnsSelect } from "./columns-select";

type Props = {
  children?: React.ReactNode;
  vertical?: Devices;
  halfWidth?: Devices;
  reverseOrder?: Devices;
  width?: MultiDeviceWidthType;
  heightVariant?: DeviceRecord<"fit-to-content" | "expand-to-fill" | "custom">;
  height?: MultiDeviceWidthType;
  columnGap?: MultiDeviceWidthType;
  columnPadding?: MultiDeviceWidthType;
  marginBottom?: MultiDeviceWidthType;
  marginTop?: MultiDeviceWidthType;
};

export const Columns = ({
  children,
  vertical,
  halfWidth,
  reverseOrder,
  width,
  heightVariant,
  height,
  columnGap,
  columnPadding,
  marginBottom,
  marginTop,
}: Props) => {
  const initialMount = useRef<boolean>(true);
  const lastChildCount = useRef<number>(0);
  const {
    actions: { setProp },
    enabled,
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
    nodeId,
    childs,
  } = useNode((node) => ({
    nodeId: node.id,
    childs: node.data.nodes,
  }));

  useEffect(() => {
    if (childs.length === 0 || !enabled) return;

    if (initialMount.current) {
      initialMount.current = false;
      lastChildCount.current = childs.length;
    } else if (lastChildCount.current !== childs.length) {
      lastChildCount.current = childs.length;
      childs.forEach((child) =>
        setProp(child, (props) => {
          props.width = parseFloat((100 / childs.length).toFixed(2));
        })
      );
    }
  }, [childs, setProp, enabled]);

  return (
    <StyledColumnsDiv
      ref={(ref) => {
        connect(ref!);
      }}
      className="p-4 w-full flex justify-center max-w-full"
      $vertical={vertical}
      $halfWidth={halfWidth}
      $reverseOrder={reverseOrder}
      $width={width}
      $heightVariant={heightVariant}
      $height={height}
      $columnGap={columnGap}
      $columnPadding={columnPadding}
      $marginBottom={marginBottom}
      $marginTop={marginTop}
      $columnsCount={childs.length}
    >
      {children ? children : enabled && <ColumnsSelect id={nodeId} />}
    </StyledColumnsDiv>
  );
};

Columns.craft = {
  displayName: "Columns",
  rules: {
    canMoveIn: (props: any) => {
      if (props.data.name === "Column") return true;
      return false;
    },
  },
  related: {
    toolbar: ColumnsToolbar,
  },
};
