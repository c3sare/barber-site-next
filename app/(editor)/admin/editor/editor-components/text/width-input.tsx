import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";

const metrics = ["px", "em", "rem", "vw", "vh", "auto", "custom"] as const;

type Props = {
  metric: (typeof metrics)[number];
  value?: string;
};

export const WidthInput = ({ metric, value }: Props) => {
  const {
    actions: { setProp },
  } = useNode();

  const setValue = (value: string) => {
    setProp((props: any) => {
      props.width.value = value;
    });
  };

  return (
    <div className="w-1/2 flex items-center gap-2 justify-end">
      {metric === "px" && (
        <Slider
          step={1}
          min={0}
          max={1200}
          value={[parseInt(value ?? "0")]}
          onValueChange={([value]) => setValue(value.toString())}
        />
      )}
      <div
        className={cn(
          "relative border rounded-sm p-1 pr-4",
          metric === "custom" && "pr-12",
          metric === "auto" && "pr-0"
        )}
      >
        <input
          value={value}
          disabled={metric === "auto"}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "w-10 text-xs disabled:opacity-0",
            metric === "custom" && "w-12"
          )}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-1/2 -translate-y-1/2 right-1 text-xs">
            {metric}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {metrics.map((metric) => (
              <DropdownMenuItem
                key={metric}
                onClick={() =>
                  setProp((props: any) => {
                    props.width.metric = metric;
                  })
                }
              >
                {metric}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
