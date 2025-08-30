import { cache } from "react";
import * as z from "zod/mini";

const fontsSchema = z.object({
  kind: z.string(),
  items: z.array(
    z.object({
      family: z.string(),
      variants: z.array(z.string()),
      subsets: z.array(z.string()),
      version: z.string(),
      lastModified: z.string(),
      files: z.record(z.string(), z.url()),
      category: z.string(),
      kind: z.string(),
      menu: z.url(),
    })
  ),
});

export const getFonts = cache(async () => {
  try {
    const request = await fetch(
      "https://www.googleapis.com/webfonts/v1/webfonts?key=" +
        process.env.GOOGLE_FONTS_API_KEY,
      { cache: "force-cache" }
    );
    const json = await request.json();

    const data = fontsSchema.parse(json);

    return data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
});
