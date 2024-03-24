import { FilesTable } from "./_components/FilesTable";
import { getFilesFromFilesLibrary } from "@/actions/admin/file-library/getFilesFromFilesLibrary";
import { unstable_noStore as noStore } from "next/cache";

export default async function FileLibraryPage() {
  noStore();
  const data = await getFilesFromFilesLibrary();

  return <FilesTable files={data} />;
}
