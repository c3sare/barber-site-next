const SlideItemParagraph: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <p key={3} className="text-lg">
      {children}
    </p>
  );
};

export default SlideItemParagraph;
