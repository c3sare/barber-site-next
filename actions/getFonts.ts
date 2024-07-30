import { z } from "zod";

const fontsSchema = z.object({
  kind: z.string(),
  items: z.array(
    z.object({
      family: z.string(),
      variants: z.array(z.string()),
      subsets: z.array(z.string()),
      version: z.string(),
      lastModified: z.string(),
      files: z.record(z.string(), z.string().url()),
      category: z.string(),
      kind: z.string(),
      menu: z.string().url(),
    })
  ),
});

export const getFonts = async () => {
  try {
    const request = await fetch(
      "https://www.googleapis.com/webfonts/v1/webfonts?key=" +
        process.env.GOOGLE_FONTS_API_KEY
    );
    const json = await request.json();

    const data = fontsSchema.parse(json);

    return data.items.slice(0, 10);
  } catch (error) {
    console.error(error);
    return [];
  }
};
