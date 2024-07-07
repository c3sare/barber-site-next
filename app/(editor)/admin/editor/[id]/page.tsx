import { Frame, Element } from "@/app/(site)/page/[slug]/editor-lib";
import { Root } from "@/app/(site)/admin/pages/editor/editor-components/root";
import lz from "lzutf8";
import db from "@/lib/drizzle";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

type NodeType = {
  custom: any;
  displayName: string;
  hidden: boolean;
  isCanvas: boolean;
  linkedNodes: Record<string, string>;
  nodes: string[];
  parent: string;
  props: Record<string, any>;
  type: {
    resolvedName: string;
  };
};

type Data = {
  ROOT: NodeType;
} & Record<string, NodeType>;

export default async function AdminEditorPreviewPage({
  params: { id },
}: Props) {
  const pageDb = await db.query.page.findFirst({
    where: (page, { eq }) => eq(page.id, parseInt(id)),
  });

  if (!pageDb) return notFound();

  const data = pageDb.data;

  const content: Data =
    data === "{}" ? null : JSON.parse(lz.decompress(lz.decodeBase64(data)));

  if (!content) return null;

  return (
    <Frame data={content}>
      <Element data-cy="root" is={Root} canvas />
    </Frame>
  );
}
