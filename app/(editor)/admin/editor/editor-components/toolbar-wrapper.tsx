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
import { useMemo } from "react";
import { duplicateNode } from "../utils";

type Props = {
  editContent?: React.ReactNode;
  composeContent?: React.ReactNode;
  settingsContent?: React.ReactNode;
};

export const ToolbarWrapper = ({
  editContent,
  composeContent,
  settingsContent,
}: Props) => {
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
    if (composeContent) count++;
    if (settingsContent) count++;

    return count;
  }, [editContent, composeContent, settingsContent]);

  const tabClasses = useMemo(() => {
    const classes = [null, "hidden", "[&>button]:w-1/2", "[&>button]:w-1/3"];

    return classes[tabCount];
  }, [tabCount]);

  const defaultTab = useMemo(() => {
    if (editContent) return "edit";
    if (composeContent) return "compose";
    if (settingsContent) return "settings";
  }, [composeContent, editContent, settingsContent]);

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
            <TabsTrigger value="edit">
              <PencilIcon />
              <span className="sr-only">Basic settings</span>
            </TabsTrigger>
          )}
          {!!composeContent && (
            <TabsTrigger value="compose">
              <PaletteIcon />
              <span className="sr-only">Style settings</span>
            </TabsTrigger>
          )}
          {!!settingsContent && (
            <TabsTrigger value="settings">
              <SettingsIcon />
              <span className="sr-only">Advanced settings</span>
            </TabsTrigger>
          )}
        </TabsList>
        {!!editContent && (
          <TabsContent className="flex flex-col gap-2" value="edit">
            {editContent}
          </TabsContent>
        )}
        {!!composeContent && (
          <TabsContent value="compose">{composeContent}</TabsContent>
        )}
        {!!settingsContent && (
          <TabsContent value="settings">{settingsContent}</TabsContent>
        )}
      </Tabs>
    </>
  );
};
