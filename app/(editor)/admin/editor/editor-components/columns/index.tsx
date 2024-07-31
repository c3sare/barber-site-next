"use client";

import { useEditor, useNode } from "@craftjs/core";
import { Column } from "../column";
import { StyledColumnsDiv } from "./styled-columns-div";
import {
  DeviceRecord,
  Devices,
  MultiDeviceWidthType,
} from "../toolbar-elements/types";
import { ColumnsToolbar } from "./toolbar";

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
  const {
    connectors: { connect },
    nodeId,
    nodes,
  } = useNode((node) => ({
    nodeId: node.id,
    nodes: node.data.nodes.length,
  }));

  return (
    <StyledColumnsDiv
      ref={(ref) => {
        connect(ref!);
      }}
      className="min-h-[200px] p-4 w-full flex items-center flex-wrap justify-center"
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
      $columnsCount={nodes}
    >
      {children ? children : <ColumnsSelect id={nodeId} />}
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

const getDefaultProps = (val: { metric: string; value: number }) => {
  const defaultVal = {
    metric: "px",
  };

  return {
    width: {
      "2xl": val,
      xl: defaultVal,
      lg: defaultVal,
      md: defaultVal,
      sm: defaultVal,
    },
  };
};

export const ColumnsSelect = ({ id }: { id: string }) => {
  const {
    actions: { add },
    query: { parseFreshNode },
  } = useEditor();

  return (
    <div className="w-full bg-white p-12 flex justify-center flex-wrap items-center">
      <div className="text-base font-bold w-full text-center">
        Choose a column structure
      </div>
      <button
        className="h-24 w-48 p-4 flex gap-4 group"
        onClick={() => {
          const freshNode = {
            data: {
              type: Column,
              props: getDefaultProps({ metric: "%", value: 50 }),
              isCanvas: true,
            },
          };

          add(parseFreshNode(freshNode).toNode(), id);
          add(parseFreshNode(freshNode).toNode(), id);
        }}
      >
        <div className="bg-gray-400 h-full w-1/2 transition-colors group-hover:bg-blue-300" />
        <div className="bg-gray-400 h-full w-1/2 transition-colors group-hover:bg-blue-300" />
      </button>
      <button
        className="h-24 w-48 p-4 flex gap-4 group"
        onClick={() => {
          const freshNode = {
            data: {
              type: Column,
              props: getDefaultProps({ metric: "%", value: 33.33 }),
              isCanvas: true,
            },
          };

          add(parseFreshNode(freshNode).toNode(), id);
          add(parseFreshNode(freshNode).toNode(), id);
          add(parseFreshNode(freshNode).toNode(), id);
        }}
      >
        <div className="bg-gray-400 h-full w-1/3 transition-colors group-hover:bg-blue-300" />
        <div className="bg-gray-400 h-full w-1/3 transition-colors group-hover:bg-blue-300" />
        <div className="bg-gray-400 h-full w-1/3 transition-colors group-hover:bg-blue-300" />
      </button>
      <button
        className="h-24 w-48 p-4 flex gap-4 group"
        onClick={() => {
          const freshNode = {
            data: {
              type: Column,
              props: getDefaultProps({ metric: "%", value: 25 }),
              isCanvas: true,
            },
          };

          add(parseFreshNode(freshNode).toNode(), id);
          add(parseFreshNode(freshNode).toNode(), id);
          add(parseFreshNode(freshNode).toNode(), id);
          add(parseFreshNode(freshNode).toNode(), id);
        }}
      >
        <div className="bg-gray-400 h-full w-1/4 transition-colors group-hover:bg-blue-300" />
        <div className="bg-gray-400 h-full w-1/4 transition-colors group-hover:bg-blue-300" />
        <div className="bg-gray-400 h-full w-1/4 transition-colors group-hover:bg-blue-300" />
        <div className="bg-gray-400 h-full w-1/4 transition-colors group-hover:bg-blue-300" />
      </button>
      <button
        className="h-24 w-48 p-4 flex gap-4 group"
        onClick={() => {
          const freshNode1 = {
            data: {
              type: Column,
              props: getDefaultProps({ metric: "%", value: 70 }),
              isCanvas: true,
            },
          };
          const freshNode2 = {
            data: {
              type: Column,
              props: getDefaultProps({ metric: "%", value: 30 }),
              isCanvas: true,
            },
          };

          add(parseFreshNode(freshNode1).toNode(), id);
          add(parseFreshNode(freshNode2).toNode(), id);
        }}
      >
        <div
          className="bg-gray-400 h-full transition-colors group-hover:bg-blue-300"
          style={{ width: "70%" }}
        />
        <div
          className="bg-gray-400 h-full transition-colors group-hover:bg-blue-300"
          style={{ width: "30%" }}
        />
      </button>
      <button
        className="h-24 w-48 p-4 flex gap-4 group"
        onClick={() => {
          const freshNode1 = {
            data: {
              type: Column,
              props: getDefaultProps({ metric: "%", value: 30 }),
              isCanvas: true,
            },
          };
          const freshNode2 = {
            data: {
              type: Column,
              props: getDefaultProps({ metric: "%", value: 70 }),
              isCanvas: true,
            },
          };

          add(parseFreshNode(freshNode1).toNode(), id);
          add(parseFreshNode(freshNode2).toNode(), id);
        }}
      >
        <div
          className="bg-gray-400 h-full transition-colors group-hover:bg-blue-300"
          style={{ width: "30%" }}
        />
        <div
          className="bg-gray-400 h-full transition-colors group-hover:bg-blue-300"
          style={{ width: "70%" }}
        />
      </button>
    </div>
  );
};
