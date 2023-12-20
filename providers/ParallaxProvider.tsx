"use client";
import { ParallaxProvider as ParallaxProviderLibrary } from "react-scroll-parallax";

export const ParallaxProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <ParallaxProviderLibrary scrollAxis="vertical">
    {children}
  </ParallaxProviderLibrary>
);
