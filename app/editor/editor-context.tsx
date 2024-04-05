"use client";

import { Button } from "./editor-components/button";
import { Container } from "./editor-components/container";
import dynamic from "next/dynamic";
const Element = dynamic(
  () => import("@craftjs/core").then((item) => item.Element),
  { ssr: false }
);
export const EditorFrameProvider = dynamic(
  () => import("@craftjs/core").then((item) => item.Frame),
  {
    ssr: false,
  }
);

const Editor = dynamic(
  () => import("@craftjs/core").then((item) => item.Editor),
  {
    ssr: false,
  }
);

export const RootElement = (props: any) => {
  return <Element data-cy="root" is={Container} canvas {...props} />;
};

type EditorProviderProps = Omit<
  React.ComponentPropsWithoutRef<typeof Editor>,
  "resolver"
>;

export const EditorProvider = ({ children, ...props }: EditorProviderProps) => (
  <Editor resolver={{ Button, Container }} {...props}>
    {children}
  </Editor>
);
