"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type CommentCarouselProps = {
  children: JSX.Element[];
};

export const CommentCarousel: React.FC<CommentCarouselProps> = ({
  children,
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlideApi] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlideApi(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlideApi(api.selectedScrollSnap());
    });
  }, [api]);

  const setCurrentSlide = (slideIndex: number) => {
    if (api) {
      api.scrollTo(slideIndex);
    }
  };

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {children.map((item, i) => (
          <CarouselItem key={i}>{item}</CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-2 items-center justify-center my-6">
        {[...Array(children.length)].map((_i, i) => (
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
    </Carousel>
  );
};
