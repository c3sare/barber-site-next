"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

type ContainerProps = {
  children?: React.ReactNode;
  wrapperClassName?: string;
  className?: string;
  bgImageUrl?: string;
  parallax?: boolean;
  bgPriority?: boolean;
  parallaxClassName?: string;
};

const Container: React.FC<ContainerProps> = ({
  children,
  bgImageUrl,
  wrapperClassName,
  className,
  parallax,
  bgPriority,
  parallaxClassName,
}) => {
  const wrapper = (
    <div className={cn("max-w-7xl mx-auto px-4 w-full relative", className)}>
      <div className="z-[1]">{children}</div>
    </div>
  );

  return (
    <div className={cn("w-full h-full relative", wrapperClassName)}>
      {bgImageUrl ? (
        parallax ? (
          <ParallaxBanner>
            <ParallaxBannerLayer
              className={cn("relative", parallaxClassName)}
              speed={-30}
            >
              <Image
                src={bgImageUrl}
                fill
                priority={bgPriority}
                sizes="100vw"
                alt="Background Image"
                className="object-cover select-none -z-10"
              />
            </ParallaxBannerLayer>
            {wrapper}
          </ParallaxBanner>
        ) : (
          <>
            <Image
              src={bgImageUrl}
              fill
              sizes="100vw"
              alt="Background Image"
              className="object-cover select-none -z-10"
            />
            {wrapper}
          </>
        )
      ) : (
        wrapper
      )}
    </div>
  );
};

export default Container;
