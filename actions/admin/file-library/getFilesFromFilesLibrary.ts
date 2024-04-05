import { db } from "@/lib/db";

export const getFilesFromFilesLibrary = async () => {
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
};

export type FileLibraryType = Awaited<
  ReturnType<typeof getFilesFromFilesLibrary>
>[number];
