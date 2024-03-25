export type HeroDataType = {
  image: string;
  text: string;
  button?: {
    text: string;
    link: {
      type: "internal" | "external";
      url: string;
    };
  };
};
