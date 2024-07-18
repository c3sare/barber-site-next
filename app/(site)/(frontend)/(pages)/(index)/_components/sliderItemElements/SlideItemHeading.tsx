const SlideItemHeading: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="font-bold text-6xl md:text-8xl uppercase font-bebes">
      {children}
    </h2>
  );
};

export default SlideItemHeading;
