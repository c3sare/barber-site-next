import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";

const data = [
  {
    id: "1",
    name: "file",
    extension: "PNG" as const,
    type: "IMAGE" as const,
    width: 100,
    height: 100,
    uploadedAt: new Date(),
    preview: "/images/logo-black.png",
    desc: "Description",
    author: "Admin",
  },
];

export default function FileLibraryPage() {
  return <DataTable columns={columns} data={data} />;
}
