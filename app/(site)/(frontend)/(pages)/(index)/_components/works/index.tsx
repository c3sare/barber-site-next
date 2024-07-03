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
      <h4>{title}</h4>
      <div className="w-full flex-wrap flex">{children}</div>
    </div>
  );
};
