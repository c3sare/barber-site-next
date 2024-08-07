import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEditor, useNode } from "@craftjs/core";
import {
  CopyIcon,
  PaletteIcon,
  PencilIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";
import { memo, useMemo } from "react";
import { duplicateNode } from "../utils";

type Props = {
  editContent?: React.ReactNode;
  editDesign?: React.ReactNode;
  editSettings?: React.ReactNode;
};

export const ToolbarWrapper = memo(
  ({ editContent, editDesign, editSettings }: Props) => {
    const { id, name, node, parent } = useNode((node) => ({
      text: node.data.props.text,
      width: node.data.props.width,
      name: node.data.name,
      parent: node.data.parent,
      node: node,
    }));
    const {
      actions: { delete: deleteNode, history },
      query,
    } = useEditor();

    const tabCount = useMemo(() => {
      let count = 0;

      if (editContent) count++;
      if (editDesign) count++;
      if (editSettings) count++;

      return count;
    }, [editContent, editDesign, editSettings]);

    const tabClasses = useMemo(() => {
      const classes = [null, "hidden", "[&>button]:w-1/2", "[&>button]:w-1/3"];

      return classes[tabCount];
    }, [tabCount]);

    const defaultTab = useMemo(() => {
      if (editContent) return "content";
      if (editDesign) return "design";
      if (editSettings) return "settings";
    }, [editDesign, editContent, editSettings]);

    return (
      <>
        <div className="flex items-center justify-between p-4 border-b">
          <span>{name}</span>
          <div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                duplicateNode(history.throttle().add, query, node, parent!)
              }
            >
              <CopyIcon className="size-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => deleteNode(id)}>
              <TrashIcon className="size-4" />
            </Button>
          </div>
        </div>
        <Tabs defaultValue={defaultTab} className="w-full px-2">
          <TabsList className={cn("w-full", tabClasses)}>
            {!!editContent && (
              <TabsTrigger value="content">
                <PencilIcon />
                <span className="sr-only">Basic settings</span>
              </TabsTrigger>
            )}
            {!!editDesign && (
              <TabsTrigger value="design">
                <PaletteIcon />
                <span className="sr-only">Style settings</span>
              </TabsTrigger>
            )}
            {!!editSettings && (
              <TabsTrigger value="settings">
                <SettingsIcon />
                <span className="sr-only">Advanced settings</span>
              </TabsTrigger>
            )}
          </TabsList>
          {!!editContent && (
            <TabsContent className="flex flex-col gap-2" value="content">
              {editContent}
            </TabsContent>
          )}
          {!!editDesign && (
            <TabsContent value="design">{editDesign}</TabsContent>
          )}
          {!!editSettings && (
            <TabsContent value="settings">{editSettings}</TabsContent>
          )}
        </Tabs>
      </>
    );
  }
);

ToolbarWrapper.displayName = "ToolbarWrapper";
