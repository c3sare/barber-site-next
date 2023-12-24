"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SlideWidthContext = createContext(0);

export const useSlideWidth = () => useContext(SlideWidthContext);

type SliderProps = {
  children?: React.ReactNode;
};

const Slider: React.FC<SliderProps> = ({ children }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const items = children instanceof Array ? children : [children];

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.clientWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize, true);

    return () => window.removeEventListener("resize", handleResize, true);
  }, []);

  return (
    <div className="w-full overflow-hidden z-10 relative" ref={sliderRef}>
      <div
        className="transition-transform"
        style={{
          width: `${items.length * slideWidth}px`,
          transform: `translate3d(-${slideWidth * currentSlide}px, 0, 0)`,
        }}
      >
        <SlideWidthContext.Provider value={slideWidth}>
          {items}
        </SlideWidthContext.Provider>
        <div className="clear-both" />
      </div>
      <div className="flex gap-2 items-center justify-center my-6">
        {[...Array(items.length)].map((_i, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={cn(
              "w-[10px] h-[10px] bg-[#aaa] rounded-full transition-colors hover:bg-white",
              currentSlide === i && "bg-white"
            )}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 -translate-y-1/2 left-0 text-[#aaa] hover:text-white transition-colors"
        onClick={() =>
          setCurrentSlide((prev) => {
            if (prev + 1 < items.length) return prev + 1;
            else return prev;
          })
        }
      >
        <ChevronLeftCircle width={48} height={48} />
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-0 text-[#aaa] hover:text-white transition-colors"
        onClick={() =>
          setCurrentSlide((prev) => {
            if (prev - 1 >= 0) return prev - 1;
            else return prev;
          })
        }
      >
        <ChevronRightCircle width={48} height={48} />
      </button>
    </div>
  );
};

export default Slider;
