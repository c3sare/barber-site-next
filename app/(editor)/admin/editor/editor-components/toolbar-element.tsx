import { Card } from "@/components/ui/card";
import { MiniDeviceSelect } from "../mini-device-select";
import { Cross2Icon } from "@radix-ui/react-icons";
import { memo } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  title: string;
  isVisibleResetButton?: boolean;
  onClickReset: () => void;
  hideDeviceSelect?: boolean;
  column?: boolean;
  hideResetButton?: boolean;
};

export const ToolbarElement = memo(
  ({
    children,
    onClickReset,
    isVisibleResetButton,
    title,
    hideDeviceSelect,
    column,
    hideResetButton,
  }: Props) => {
    return (
      <Card
        className={cn(
          "p-2 pl-1 flex group mb-1",
          column ? "flex-col" : "items-center justify-between"
        )}
      >
        <div className="flex items-center gap-1 w-1/2 relative">
          <span className={cn("text-xs", hideResetButton ? "" : "pl-3")}>
            {title}
          </span>
          {!hideResetButton && (
            <button
              disabled={!isVisibleResetButton}
              className="absolute top-1/2 -translate-y-1/2 left-0 transition-opacity disabled:opacity-0"
              onClick={onClickReset}
            >
              <Cross2Icon className="size-3" />
            </button>
          )}
          {!hideDeviceSelect && <MiniDeviceSelect />}
        </div>
        <div
          className={cn(
            "flex items-center gap-2 justify-end",
            column ? "w-full" : "w-1/2"
          )}
        >
          {children}
        </div>
      </Card>
    );
  }
);

ToolbarElement.displayName = "ToolbarElement";
