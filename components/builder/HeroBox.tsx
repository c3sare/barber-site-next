import { File } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HeroDataType } from "./types/HeroDataType";

type HeroBoxProps = {
  data: HeroDataType;
  images: File[];
};

export const HeroBox: React.FC<HeroBoxProps> = ({
  data: { image, text, button },
  images,
}) => {
  const logo = images.find((img) => img.id === image);

  if (!logo) throw new Error("There's not 'image' in 'images' array");

  const aspectRatio = logo.width / logo.height;

  const width = 228;
  const height = Math.round(width * aspectRatio);

  return (
    <div className="w-full md:w-1/2 lg:w-1/4 float-left px-4 mb-6">
      <Image
        src={logo.url}
        placeholder="blur"
        blurDataURL={logo.blurDataUrl}
        alt={logo.name}
        width={width}
        height={height}
      />
      <p className="text-sm leading-7">{text}</p>
      {!!button && (
        <Button size="lg" asChild>
          {React.createElement(
            !button.url.includes("http") ? Link : "a",
            { href: button.url },
            button.text
          )}
        </Button>
      )}
    </div>
  );
};
