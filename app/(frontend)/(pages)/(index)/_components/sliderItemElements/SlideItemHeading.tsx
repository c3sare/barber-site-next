const SlideItemHeading: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h2 key={1} className="font-bold text-7xl">
      {children}
    </h2>
  );
};

export default SlideItemHeading;
