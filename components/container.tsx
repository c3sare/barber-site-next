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
};

const Container: React.FC<ContainerProps> = ({
  children,
  bgImageUrl,
  wrapperClassName,
  className,
  parallax,
  bgPriority,
}) => {
  const wrapper = (
    <div
      className={cn("max-w-7xl mx-auto px-4 w-full relative z-10", className)}
    >
      {children}
    </div>
  );

  return (
    <div className={cn("w-full h-full relative", wrapperClassName)}>
      {bgImageUrl ? (
        parallax ? (
          <ParallaxBanner>
            <ParallaxBannerLayer className="relative" speed={-30}>
              <Image
                src={bgImageUrl}
                fill
                priority={bgPriority}
                sizes="100vw"
                alt="Background Image"
                className="object-cover select-none"
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
              className="object-cover select-none"
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
