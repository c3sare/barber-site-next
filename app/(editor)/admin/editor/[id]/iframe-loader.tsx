"use client";

import dynamic from "next/dynamic";

const Iframe = dynamic(() => import("./iframe"), { ssr: false });

export const IframeLoader = ({ children }: React.PropsWithChildren) => (
  <Iframe className="w-full bg-background">{children}</Iframe>
);
