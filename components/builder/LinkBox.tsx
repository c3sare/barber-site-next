"use client";

import Link from "next/link";
import React from "react";
import { LinkBoxDataType } from "./types/LinkBoxDataType";
import { file } from "@/drizzle/schema";
import { Typography } from "../typography";

type LinkBoxProps = {
  images: (typeof file.$inferSelect)[];
  data: LinkBoxDataType;
};

export const LinkBox: React.FC<LinkBoxProps> = ({ data: { title, links } }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/5 float-left px-4 mb-6">
      <Typography
        tag="h5"
        className="text-white before:content-none after:bg-white text-2xl"
      >
        {title}
      </Typography>
      <ul className="flex flex-col gap-2">
        {links.map(({ url, name }, i) => (
          <li
            key={i}
            className="before:content-['>'] before:font-bold flex gap-1 text-sm"
          >
            {React.createElement(
              !url.includes("http") ? Link : "a",
              {
                href: url,
                className: "hover:text-primary transition-colors duration-500",
              },
              name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
