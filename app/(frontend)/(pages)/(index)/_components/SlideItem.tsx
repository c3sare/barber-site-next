"use client";

import { animated, useTransition } from "react-spring";
import { useSlider } from "./Slider";
import Image from "next/image";

type SlideItemProps = {
  children: JSX.Element | JSX.Element[];
  index: number;
  backgroundUrl: string;
};

const SlideItem: React.FC<SlideItemProps> = ({
  children,
  index,
  backgroundUrl,
}) => {
  const slideItems = children instanceof Array ? children : [children];
  const slider = useSlider();
  const isActive = slider?.currentSlideIndex === index;
  const transition = useTransition(isActive ? slideItems : [], {
    from: {
      opacity: 0,
    },
    enter: (item, i) => async (next, cancel) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await next({ opacity: 1, delay: i * 300 });
    },
    leave: {
      opacity: 0,
    },
  });

  const style = {
    ...(slider && slider.slideHeight !== null
      ? { height: slider.slideHeight + "px" }
      : {}),
  };

  return (
    <div
      className="w-full h-[80vh] max-h-[820px] overflow-hidden relative flex flex-col items-center justify-center"
      style={style}
    >
      <Image
        alt={`Slide ${index}`}
        src={backgroundUrl}
        fill
        sizes="100vw"
        className="object-cover object-right z-[-1]"
      />
      {isActive &&
        transition((style, item) => (
          <animated.div style={style}>{item}</animated.div>
        ))}
    </div>
  );
};

export default SlideItem;
