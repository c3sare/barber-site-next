"use client";

import { animated, useTrail } from "@react-spring/web";
import { useSlider } from "./Slider";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

type SlideItemProps = {
  children: React.ReactElement | React.ReactElement[];
  index: number;
  backgroundUrl: string;
  itemsAlign: "left" | "right" | "center";
  priority?: boolean;
};

const SlideItem: React.FC<SlideItemProps> = ({
  children,
  index,
  backgroundUrl,
  itemsAlign,
  priority,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const slideItems = React.Children.toArray(children);
  const slider = useSlider();
  const isActive = slider?.currentSlideIndex === index;
  const [trails, api] = useTrail(slideItems.length, () => ({
    opacity: 0,
    x: -300,
    y: 100,
    rotate: 25,
  }));

  useEffect(() => {
    if (isActive)
      api.start({
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        delay: 600,
      });
    else if (!isActive) {
      api.start({
        opacity: 0,
        x: -300,
        y: 100,
        rotate: 30,
      });
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (slider && slider.slideHeight !== null && contentRef.current) {
      const header = document.querySelector("body > div > header");
      const headerHeight = isMobile ? 0 : (header?.clientHeight ?? 0);
      const slideHeight = slider.slideHeight - headerHeight;
      const contentHeight = contentRef.current.offsetHeight;
      if (slideHeight <= contentHeight) {
        const value = slideHeight / contentHeight - 0.05;
        contentRef.current.style.scale = `${value.toFixed(2)}`;
      } else contentRef.current.style.scale = "1";
    }
  }, [slider, isMobile]);

  const style = {
    ...(slider && slider.slideHeight !== null
      ? { height: slider.slideHeight + "px" }
      : {}),
  };

  const align = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  };

  return (
    <div
      className={cn(
        "w-full h-[85vh] overflow-hidden relative flex items-center px-[30px] text-white text-center md:pt-36"
      )}
      style={style}
    >
      <Image
        alt={`Slide ${index}`}
        src={backgroundUrl}
        fill
        quality={100}
        sizes="100vw"
        priority={priority}
        className="object-cover object-right z-[-1] select-none"
      />
      <div
        className={cn(
          "max-w-7xl mx-auto w-full flex items-center",
          align[itemsAlign]
        )}
      >
        <div
          className="flex flex-col justify-center items-center gap-4 max-w-[750px]"
          ref={contentRef}
        >
          {trails.map((style, i) => (
            <animated.div key={i} style={style} className="my-2">
              {slideItems[i]}
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
