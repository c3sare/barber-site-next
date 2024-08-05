import { useEditor } from "@craftjs/core";
import { Column } from "../column";

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
              props: { width: 50 },
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
              props: { width: 33.33 },
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
              props: { width: 25 },
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
              props: { width: 70 },
              isCanvas: true,
            },
          };
          const freshNode2 = {
            data: {
              type: Column,
              props: { width: 30 },
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
              props: { width: 30 },
              isCanvas: true,
            },
          };
          const freshNode2 = {
            data: {
              type: Column,
              props: { width: 70 },
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
