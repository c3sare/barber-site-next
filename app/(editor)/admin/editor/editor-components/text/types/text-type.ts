export type SingleWidthType = {
  value?: string;
  metric?: "px" | "em" | "rem" | "vw" | "vh" | "auto" | "custom";
};

type MultiDeviceType = Record<
  "sm" | "md" | "lg" | "xl" | "2xl",
  SingleWidthType
>;

export type TextType = {
  text?: string;
  width?: MultiDeviceType;
  fontSize?: MultiDeviceType;
  marginTop?: MultiDeviceType;
  marginBottom?: MultiDeviceType;
};

export type WidthType = TextType["width"];

const sizes = {
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
} as const;

export const defaultTextProps: TextType = {
  text: "This is a basic text element.",
  width: sizes,
  fontSize: sizes,
  marginTop: sizes,
  marginBottom: sizes,
};
