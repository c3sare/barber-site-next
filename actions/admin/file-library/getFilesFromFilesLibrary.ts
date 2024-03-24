import { db } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

export const getFilesFromFilesLibrary = cache(
  async () => {
    const data = await db.file.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return data.map(({ author, url, ...file }) => ({
      ...file,
      author: author.name ?? "",
      preview: url,
    }));
  },
  ["admin-file-library"],
  { tags: ["file-library"], revalidate: 30 }
);

export type FileLibraryType = Awaited<
  ReturnType<typeof getFilesFromFilesLibrary>
>[number];
