import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { getFilesFromFilesLibrary } from "@/actions/getFilesFromFilesLibrary";

export default async function FileLibraryPage() {
  const data = await getFilesFromFilesLibrary();

  return <DataTable columns={columns} data={data} />;
}
