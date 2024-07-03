import lz from "lzutf8";
import { Editor, Frame, Element } from "./editor-lib";
import { Button } from "@/app/(site)/admin/pages/editor/editor-components/button";
import { Container } from "@/app/(site)/admin/pages/editor/editor-components/container";
import { Text } from "@/app/(site)/admin/pages/editor/editor-components/text";
import { Root } from "@/app/(site)/admin/pages/editor/editor-components/root";
import { ThreeRowContainer } from "@/app/(site)/admin/pages/editor/editor-components/three-row-container";

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

export const RenderPage = ({ data }: { data: string }) => {
  const content: Data =
    data === "{}" ? null : JSON.parse(lz.decompress(lz.decodeBase64(data)));

  if (!content) return null;

  return (
    <Editor
      enabled={false}
      resolver={{ Button, Container, Root, ThreeRowContainer, Text }}
    >
      <Frame data={content}>
        <Element data-cy="root" is={Root} canvas />
      </Frame>
    </Editor>
  );
};
