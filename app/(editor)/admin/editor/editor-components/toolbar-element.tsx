import { Card } from "@/components/ui/card";
import { MiniDeviceSelect } from "../mini-device-select";
import { Cross2Icon } from "@radix-ui/react-icons";
import { memo } from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
  isVisibleResetButton?: boolean;
  onClickReset: () => void;
  hideDeviceSelect?: boolean;
};

export const ToolbarElement = memo(
  ({
    children,
    onClickReset,
    isVisibleResetButton,
    title,
    hideDeviceSelect,
  }: Props) => {
    return (
      <Card className="p-2 pl-1 flex items-center justify-between group mb-1">
        <div className="flex items-center gap-1 w-1/2 relative">
          <span className="pl-3 text-xs">{title}</span>
          <button
            disabled={!isVisibleResetButton}
            className="absolute top-1/2 -translate-y-1/2 left-0 transition-opacity disabled:opacity-0"
            onClick={onClickReset}
          >
            <Cross2Icon className="size-3" />
          </button>
          {!hideDeviceSelect && <MiniDeviceSelect />}
        </div>
        <div className="w-1/2 flex items-center gap-2 justify-end">
          {children}
        </div>
      </Card>
    );
  }
);

ToolbarElement.displayName = "ToolbarElement";
