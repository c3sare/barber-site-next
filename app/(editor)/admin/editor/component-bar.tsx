"use client";

import { TextIcon } from "lucide-react";
import { BuilderElement } from "./builder-element";
import { Text } from "@/app/(site)/admin/pages/editor/editor-components/text";

export const ComponentBar = () => {
  return (
    <div className="w-[300px] p-2 h-full">
      <BuilderElement
        element={
          <Text
            fontSize={24}
            text={"Text"}
            bold={false}
            italic={false}
            htmlTag="p"
            align="left"
            color="#000000"
          />
        }
      >
        <TextIcon className="size-5" />
        Text
      </BuilderElement>
    </div>
  );
};
