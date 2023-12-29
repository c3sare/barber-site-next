import { IconType } from "@/components/icons/IconType";

type ExperienceBarProps = {
  icon: IconType;
  title: string;
  value: number;
};

export const ExperienceBar: React.FC<ExperienceBarProps> = ({
  icon: Icon,
  title,
  value,
}) => {
  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-[10px]">
        <Icon width={16} height={16} />
        <span className="text-xs">{title}</span>
      </div>
      <div className="h-[24px] w-full bg-[#f7f8fa]">
        <div
          className="h-[24px] bg-[#486b71] relative"
          style={{ width: `${value}%` }}
        >
          <div className="absolute bottom-0 h-full text-xs py-1 w-8 text-center text-white right-0">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};
