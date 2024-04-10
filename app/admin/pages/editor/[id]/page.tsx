import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const PageEditor = dynamic(() => import("../page-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center w-full">
      <Loader className="animate-spin size-16" />
    </div>
  ),
});

type Props = {
  params: {
    id: string;
  };
};

export default async function EditorPage({ params: { id } }: Props) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") return notFound();

  const page = await db.page.findUnique({
    where: {
      id,
    },
  });

  if (!page) return notFound();

  return <PageEditor content={page.data} />;
}
