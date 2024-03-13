"use client";

import { IconType } from "./IconType";

export const CloudArrowIcon: IconType = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-gray-600"
    fill="none"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);
