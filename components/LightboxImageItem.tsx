"use client";

import Image from "next/image";
import { Item } from "./lightbox";
import { ZoomIcon } from "@/components/icons/ZoomIcon";

type ImageItemProps = {
  src: string;
  i: number;
};

const LightboxImageItem: React.FC<ImageItemProps> = ({ src, i }) => {
  return (
    <Item original={src} thumbnail={src} width={200} height={200}>
      {({ open, ref }) => (
        <div
          key={i}
          className="w-1/4 group relative float-left cursor-pointer"
          onClick={open}
          ref={ref}
        >
          <Image
            src={src}
            alt={`Fryzura ${i}`}
            width={200}
            className="w-full"
            height={200}
          />
          <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-[rgba(0,_0,_0,_.6)] flex items-center justify-center duration-500 transition-opacity">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <ZoomIcon />
            </div>
          </div>
        </div>
      )}
    </Item>
  );
};

export default LightboxImageItem;
