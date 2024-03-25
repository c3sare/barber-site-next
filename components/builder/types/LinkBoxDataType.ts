export type LinkBoxDataType = {
  title: string;
  links: {
    type: "internal" | "external";
    href: string;
    text: string;
  }[];
};
