import lz from "lzutf8";
import { Editor, Frame, Element } from "./editor-lib";
import { Button } from "@/app/(editor)/admin/editor/editor-components/button";
import { Container } from "@/app/(editor)/admin/editor/editor-components/container";
import { Text } from "@/app/(editor)/admin/editor/editor-components/text";
import { Root } from "@/app/(editor)/admin/editor/editor-components/root";
import { ThreeRowContainer } from "@/app/(editor)/admin/editor/editor-components/three-row-container";
import { Section } from "@/app/(editor)/admin/editor/editor-components/new/section";
import { Column } from "@/app/(editor)/admin/editor/editor-components/new/column";

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

export const RenderPage = ({ data }: { data?: string | null }) => {
  const content: Data = data
    ? JSON.parse(lz.decompress(lz.decodeBase64(data)))
    : undefined;

  if (!content) return null;

  return (
    <Editor
      enabled={false}
      resolver={{
        Section,
        Column,
        Button,
        Container,
        Root,
        ThreeRowContainer,
        Text,
      }}
    >
      <Frame data={content}>
        <Element data-cy="root" is={Root} canvas />
      </Frame>
    </Editor>
  );
};
