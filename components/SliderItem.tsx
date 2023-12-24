"use client";

import { useSlideWidth } from "./Slider";

type SliderItemProps = {
  children?: React.ReactNode;
};

const SliderItem: React.FC<SliderItemProps> = ({ children }) => {
  const slideWidth = useSlideWidth();

  return (
    <div className="float-left px-12" style={{ width: slideWidth + "px" }}>
      {children}
    </div>
  );
};

export default SliderItem;
