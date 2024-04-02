import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { TabsLink, TabsList } from "@/components/ui/tabs-link";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user.id || session?.user.role !== "ADMIN") return notFound();

  return (
    <div className="w-full max-w-7xl p-4 mx-auto">
      <TabsList>
        <TabsLink href="/admin">Home</TabsLink>
        <TabsLink href="/admin/footer">Footer</TabsLink>
        <TabsLink href="/admin/menu">Menu</TabsLink>
        <TabsLink href="/admin/file-library">File Library</TabsLink>
      </TabsList>
      <div className="w-full p-4">{children}</div>
    </div>
  );
}
