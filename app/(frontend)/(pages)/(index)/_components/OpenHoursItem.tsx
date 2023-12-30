import { cn } from "@/lib/utils";

type OpenHourItemProps = {
  shortDay: string;
} & {
  open: boolean;
  start?: string;
  end?: string;
};

const OpenHourItem: React.FC<OpenHourItemProps> = ({
  shortDay,
  open,
  start,
  end,
}) => {
  return (
    <div
      key={shortDay}
      className={cn(
        "text-white border-b-[3px] border-b-[rgba(255,_255,_255,_0.3)] flex items-center gap-4 justify-center flex-col aspect-square min-w-[150px]",
        open ? "bg-[#486b71]" : "bg-[#a89d8e]"
      )}
    >
      <span className="text-3xl font-bold">{shortDay}</span>
      <span>{open ? `${start} - ${end}` : "CLOSED"}</span>
    </div>
  );
};

export default OpenHourItem;
