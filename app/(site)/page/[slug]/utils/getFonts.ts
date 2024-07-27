import { SerializedNodes } from "@craftjs/core";

export const getFonts = (data: SerializedNodes) => {
  if (!data) return [];
  const keys = Object.keys(data);
  const fontName: string[] = [];
  for (const key of keys) {
    const node = data[key];

    if (node.props?.font) {
      const sizes = Object.keys(node.props.font);
      for (const size of sizes) {
        const font = node.props.font[size];
        fontName.push(font);
      }
    }
  }

  return fontName;
};
