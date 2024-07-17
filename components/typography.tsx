import { cn } from "@/lib/utils";
import { createElement, useMemo } from "react";

const headerClassName =
  "my-2 mb-7 font-bebes tracking-wider uppercase font-bold text-foreground relative before:bg-gray-100 before:h-[1px] before:w-full before:absolute before:top-full before:m-[10px_0_-2px] before:left-0 after:bg-foreground after:block after:h-[2px] after:m-[10px_0_-2px] after:absolute after:left-0 after:top-full after:w-[40px]";

const components = [
  {
    tag: "h1",
    className: cn(headerClassName, "text-4xl"),
  },
  {
    tag: "h2",
    className: cn(headerClassName, "text-3xl"),
  },
  {
    tag: "h3",
    className: cn(headerClassName, "text-2xl"),
  },
  {
    tag: "h4",
    className: cn(headerClassName, "text-xl leading-5 tracking-wider"),
  },
  {
    tag: "h5",
    className: cn(headerClassName, "text-lg"),
  },
  {
    tag: "h6",
    className: cn(headerClassName, "text-base"),
  },
  {
    tag: "div",
    className: "div",
  },
  {
    tag: "p",
    className: "",
  },
  {
    tag: "span",
    className: "",
  },
] as const;

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  tag: (typeof components)[number]["tag"];
};

export const Typography = ({
  tag: Tag,
  children,
  className,
  ...props
}: Props) => {
  const tag = useMemo(() => components.find(({ tag: t }) => t === Tag), [Tag]);

  return createElement(
    Tag,
    { className: cn(tag?.className, className), ...props },
    children
  );
};
