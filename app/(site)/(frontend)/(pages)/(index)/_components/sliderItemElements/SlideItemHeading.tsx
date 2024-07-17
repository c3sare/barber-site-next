import { Typography } from "@/components/typography";

const SlideItemHeading: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Typography
      tag="h2"
      className="font-bold text-6xl md:text-8xl uppercase font-bebes"
    >
      {children}
    </Typography>
  );
};

export default SlideItemHeading;
