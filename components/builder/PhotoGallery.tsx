"use client";

import Image from "next/image";
import { Item } from "@/components/lightbox";
import { ZoomIcon } from "@/components/icons/ZoomIcon";
import { Gallery } from "@/components/lightbox";
import { File } from "@prisma/client";
import { PhotoGalleryDataType } from "./types/PhotoGalleryDataType";

type PhotoGalleryProps = {
  data: PhotoGalleryDataType;
  images: File[];
};

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ data, images }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 float-left px-4 mb-6">
      <h5 className="text-white before:content-none after:bg-white text-2xl">
        {data.title}
      </h5>
      <Gallery withCaption>
        {data.images.map(({ imageId }, i) => {
          const img = images.find((img) => img.id === imageId);

          if (!img)
            throw new Error(`Theres no image with id '${imageId}' in array`);

          return (
            <Item
              key={i}
              original={img.url}
              thumbnail={img.url}
              width={200}
              height={200}
            >
              {({ open, ref }) => (
                <div
                  key={i}
                  className="w-1/4 group aspect-square relative float-left cursor-pointer"
                  onClick={open}
                  ref={ref}
                >
                  <Image
                    src={img.url}
                    alt={`Fryzura ${i}`}
                    width={200}
                    placeholder="blur"
                    blurDataURL={img.blurDataUrl}
                    className="w-full object-cover"
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
        })}
      </Gallery>
    </div>
  );
};
