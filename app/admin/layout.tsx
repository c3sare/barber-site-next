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
      <aside className="w-[300px] h-screen border-r-2 p-4">
        <nav className="block">
          <Link className="block" href="/admin">
            Home
          </Link>
          <Link className="block" href="/admin/file-library">
            File Library
          </Link>
        </nav>
      </aside>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
