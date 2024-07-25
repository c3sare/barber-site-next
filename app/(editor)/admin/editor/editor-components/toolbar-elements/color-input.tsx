import { useNode } from "@craftjs/core";
import { useEditorContext } from "../../_ctx/editor-context";
import { ToolbarElement } from "../toolbar-element";
import { DeviceRecord } from "./types";
import { useCallback, useMemo } from "react";
import Sketch from "@uiw/react-color-sketch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import bgTransparentImage from "@/public/images/bg-transaprent.png";
import Image from "next/image";

type Props = {
  title: string;
  object_key: string;
  sizes: DeviceRecord<string>;
};

export const ColorInput = ({ sizes, object_key, title }: Props) => {
  const { device } = useEditorContext();
  const {
    actions: { setProp },
  } = useNode();

  const setValue = useCallback(
    (value?: string) => {
      setProp((props: any) => {
        props[object_key][device] = value;
      });
    },
    [device, setProp, object_key]
  );

  const value = useMemo(
    () => sizes?.[device as keyof typeof sizes],
    [sizes, device]
  );

  const isVisibleResetButton = useMemo(() => !!value, [value]);

  return (
    <ToolbarElement
      title={title}
      onClickReset={() => setValue()}
      isVisibleResetButton={isVisibleResetButton}
    >
      <input
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded-sm w-20 h-8 px-1 text-xs"
      />
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="size-8 rounded-sm border"
            style={{ backgroundColor: value }}
          >
            {!value && (
              <Image
                src={bgTransparentImage}
                alt="Transparent"
                width={32}
                height={32}
                quality={100}
              />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="w-auto p-0 flex flex-col"
        >
          <div className="w-full p-3 flex items-center justify-between">
            <span className="text-xs">Color picker</span>
            <PopoverClose>
              <Cross2Icon />
            </PopoverClose>
          </div>
          <Sketch color={value} onChange={(color) => setValue(color.hexa)} />
        </PopoverContent>
      </Popover>
    </ToolbarElement>
  );
};
