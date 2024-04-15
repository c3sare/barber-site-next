"use client";

type Props = {
  text: string;
  fontSize: number;
};

export const Text = ({ fontSize, text }: Props) => {
  return <p style={{ fontSize: `${fontSize}px` }}>{text}</p>;
};
