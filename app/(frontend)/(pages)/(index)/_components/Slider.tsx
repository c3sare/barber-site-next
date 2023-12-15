"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import SlideChangeButton from "./SlideChangeButton";

type SliderProps = {
  children: JSX.Element[];
};

type SliderContextType = {
  slideHeight: number | null;
  currentSlideIndex: number;
};

const SliderContext = createContext<SliderContextType | null>(null);

export const useSlider = () => useContext(SliderContext);

const Slider: React.FC<SliderProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideHeight, setSlideHeight] = useState<number | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (sliderContainerRef.current) {
        setSlideHeight(sliderContainerRef.current.clientWidth / 1.4275);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize, true);

    return () => window.removeEventListener("resize", handleResize, true);
  }, []);

  const handleClickChangeSlide = (val: number) =>
    setCurrentSlide((prev) => {
      if (val < 0) {
        if (prev + val < 0) return children.length - 1;

        return prev + val;
      } else if (val > 0) {
        const value = (prev + val) % children.length;
        return value < 0 ? value * -1 : value;
      }
      return 0;
    });

  const style = {
    ...(slideHeight !== null
      ? {
          height: slideHeight + "px",
        }
      : {}),
  };

  const styleTransform = {
    ...(slideHeight !== null
      ? {
          transform: `translateY(${
            -(slideHeight > 820 ? 820 : slideHeight) * currentSlide
          }px)`,
        }
      : {}),
  };

  return (
    <SliderContext.Provider
      value={{ slideHeight, currentSlideIndex: currentSlide }}
    >
      <div
        ref={sliderContainerRef}
        className="h-[80vh] max-h-[820px] w-full overflow-hidden relative group"
        style={style}
      >
        <div
          className="transition-transform duration-700 ease"
          style={styleTransform}
        >
          {children}
        </div>
        <SlideChangeButton
          variant="prev"
          onClick={() => handleClickChangeSlide(-1)}
        />
        <SlideChangeButton
          variant="next"
          onClick={() => handleClickChangeSlide(1)}
        />
      </div>
    </SliderContext.Provider>
  );
};

export default Slider;
