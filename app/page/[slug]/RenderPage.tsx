import { componentsReadOnly as components } from "./components";
import lz from "lzutf8";

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

const Node = ({ node, data }: { node: NodeType; data: Data }) => {
  let typeName = "";
  if (typeof node.type === "object") {
    typeName = node.type.resolvedName;
  } else {
    typeName = node.type;
  }

  const Children = [...Object.values(node.linkedNodes), ...node.nodes].map(
    (x) => {
      return <Node key={x} node={data[x]} data={data} />;
    }
  );

  const Component = components[typeName as keyof typeof components];

  return <Component {...(node.props as any)}>{Children}</Component>;
};

export const RenderPage = ({ data }: { data: string }) => {
  const content: Data =
    data === "{}" ? null : JSON.parse(lz.decompress(lz.decodeBase64(data)));

  if (!content) return null;

  return <Node node={content.ROOT} data={content} />;
};
