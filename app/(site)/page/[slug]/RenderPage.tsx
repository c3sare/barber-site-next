import lz from "lzutf8";
import { Editor, Frame, Element } from "./editor-lib";
import { Text } from "@/app/(editor)/admin/editor/editor-components/text";
import { Root } from "@/app/(editor)/admin/editor/editor-components/root";
import { Section } from "@/app/(editor)/admin/editor/editor-components/section";
import { Column } from "@/app/(editor)/admin/editor/editor-components/column";
import { SerializedNodes } from "@craftjs/core";
import { getFonts } from "./utils/getFonts";
import HeadPortal from "./head-portal";
import { Columns } from "@/app/(editor)/admin/editor/editor-components/columns";
import { Heading } from "@/app/(editor)/admin/editor/editor-components/heading";

export const RenderPage = ({ data }: { data?: string | null }) => {
  const content: SerializedNodes = data
    ? JSON.parse(lz.decompress(lz.decodeBase64(data)))
    : undefined;

  if (!content) return null;

  const fonts = getFonts(content);

  return (
    <Editor
      enabled={false}
      resolver={{
        Section,
        Column,
        Columns,
        Root,
        Text,
        Heading,
      }}
    >
      <Frame data={content}>
        <Element data-cy="root" is={Root} canvas />
      </Frame>
      <HeadPortal>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=${fonts
            .map((item) => item.replaceAll(" ", "+"))
            .join("|")}`}
        />
      </HeadPortal>
    </Editor>
  );
};
