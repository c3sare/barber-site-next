import { mediaQuery } from "./media-query";

const mediaWidth = {
  "2xl": 0,
  xl: 1119,
  lg: 1023,
  md: 767,
  sm: 429,
} as const;

export const genStyle = (
  id: string,
  obj: Record<keyof typeof mediaWidth, Record<string, string>>
) => {
  const keys = Object.keys(obj) as (keyof typeof obj)[];

  return `.${id} {
        ${keys
          .map((key) => {
            const width = mediaWidth[key]!;
            const properties = obj[key];

            const css = Object.keys(properties)
              .filter((item) => properties[item] !== "")
              .map((key) => `${key}: ${properties[key]};`)
              .join(" ");

            return key === "2xl" ? css : mediaQuery(width, css);
          })
          .join("")}
    }`;
};
