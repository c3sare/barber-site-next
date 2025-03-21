import { useNode } from "@craftjs/core";
import { ToolbarElement } from "../toolbar-element";
import { memo, useCallback, useMemo } from "react";
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
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";
import { safeObjectSet } from "@/lib/utils";

type Props = {
  title: string;
  object_key: string;
  withoutSizes?: boolean;
};

export const ColorInput = memo(({ object_key, title, withoutSizes }: Props) => {
  const { device } = useFrameDeviceSize();
  const {
    actions: { setProp },
    value,
  } = useNode((node) => ({
    value: [
      object_key.split(".")[0],
      withoutSizes ? undefined : device,
      ...object_key.split(".").slice(1),
    ]
      .filter((item) => item)
      .reduce((o, k) => o?.[k as string], node.data.props) as never,
  }));

  const setValue = useCallback(
    (value?: string) => {
      setProp((props: never) => {
        const newProps = safeObjectSet(
          props,
          [
            object_key.split(".")[0],
            withoutSizes ? undefined : device,
            ...object_key.split(".").slice(1),
          ]
            .filter((item) => item)
            .join("."),
          value as unknown as never
        );
        props = newProps;
      });
    },
    [device, setProp, object_key, withoutSizes]
  );

  const isVisibleResetButton = useMemo(() => !!value, [value]);

  return (
    <ToolbarElement
      title={title}
      onClickReset={setValue}
      isVisibleResetButton={isVisibleResetButton}
    >
      <input
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded-xs w-20 h-8 px-1 text-xs"
      />
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="size-8 rounded-xs border"
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
});

ColorInput.displayName = "ColorInput";
