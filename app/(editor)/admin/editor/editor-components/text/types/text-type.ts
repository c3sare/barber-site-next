export type SingleWidthType = {
  value?: string;
  metric?: "px" | "em" | "rem" | "vw" | "vh" | "auto" | "custom";
};

export type TextType = {
  text?: string;
  width: Record<"sm" | "md" | "lg" | "xl" | "2xl", SingleWidthType>;
};

export type WidthType = TextType["width"];

export const defaultTextProps: TextType = {
  text: "This is a basic text element.",
  width: {
    sm: {
      metric: "px",
    },
    md: {
      metric: "px",
    },
    lg: {
      metric: "px",
    },
    xl: {
      metric: "px",
    },
    "2xl": {
      metric: "px",
    },
  },
};
