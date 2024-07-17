import { Typography } from "@/components/typography";

type WorksContainerProps = {
  children?: React.ReactNode;
  title: string;
};

export const WorksContainer: React.FC<WorksContainerProps> = ({
  children,
  title,
}) => {
  return (
    <div className="w-full md:w-1/2 float-left md:pr-[15px]">
      <Typography tag="h4">{title}</Typography>
      <div className="w-full flex-wrap flex">{children}</div>
    </div>
  );
};
