import Link from "next/link";
import { File } from "@prisma/client";
import React from "react";
import { LinkBoxDataType } from "./types/LinkBoxDataType";

type LinkBoxProps = {
  images: File[];
  data: LinkBoxDataType;
};

export const LinkBox: React.FC<LinkBoxProps> = ({ data: { title, links } }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 float-left px-4 mb-6">
      <h5 className="text-white before:content-none after:bg-white text-2xl">
        {title}
      </h5>
      <ul className="flex flex-col gap-2">
        {links.map(({ href, type, text }, i) => (
          <li
            key={i}
            className="before:content-['>'] before:font-bold flex gap-1 text-sm"
          >
            {React.createElement(
              type === "internal" ? Link : "a",
              {
                href,
                className: "hover:text-primary transition-colors duration-500",
              },
              text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
