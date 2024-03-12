import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user.id || session?.user.role !== "ADMIN") return notFound();

  return (
    <div className="flex flex-nowrap">
      <aside className="w-[300px]">
        <nav>
          <Link href="/admin">Home</Link>
          <Link href="/admin/file-library">File Library</Link>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
