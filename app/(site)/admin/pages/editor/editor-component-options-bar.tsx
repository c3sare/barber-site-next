"use client";

import { useEditor } from "@craftjs/core";
import React from "react";

export const EditorComponentOptionsBar = () => {
  const { selectededNodeId, toolbarSettings } = useEditor((state) => {
    const currentSelectedNodeId = Array.from(state.events.selected).at(0);

    return {
      selectededNodeId: state.events.selected,
      toolbarSettings: currentSelectedNodeId
        ? state.nodes[currentSelectedNodeId]?.related?.toolbar
        : null,
    };
  });

  return (
    <div className="w-[300px] h-screen border-l p-2 flex flex-col gap-2">
      {selectededNodeId && toolbarSettings
        ? React.createElement(toolbarSettings)
        : null}
    </div>
  );
};
