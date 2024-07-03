import { Button } from "@/app/admin/pages/editor/editor-components/button";
import { Container } from "@/app/admin/pages/editor/editor-components/container";
import { Root } from "@/app/admin/pages/editor/editor-components/root";
import { Text } from "@/app/admin/pages/editor/editor-components/text";
import { ThreeRowContainer } from "@/app/admin/pages/editor/editor-components/three-row-container";

import { Button as ButtonRO } from "@/app/admin/pages/editor/components/button";
import { Container as ContainerRO } from "@/app/admin/pages/editor/components/container";
import { Text as TextRO } from "@/app/admin/pages/editor/components/text";
import { ThreeRowContainer as ThreeRowContainerRO } from "@/app/admin/pages/editor/components/three-row-container";
import { Root as RootRO } from "@/app/admin/pages/editor/components/root";

export const componentsReadOnly = {
  Button: ButtonRO,
  Container: ContainerRO,
  Text: TextRO,
  ThreeRowContainer: ThreeRowContainerRO,
  Root: RootRO,
};

export const components = {
  Button,
  Container,
  Root,
  Text,
  ThreeRowContainer,
};
