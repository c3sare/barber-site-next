import db from "@/lib/drizzle";

export const getFilesFromFilesLibrary = async () => {
  const data = await db.query.file.findMany({
    with: {
      author: true,
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
