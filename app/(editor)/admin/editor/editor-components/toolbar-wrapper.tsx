import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor, useNode } from "@craftjs/core";
import {
  CopyIcon,
  PaletteIcon,
  PencilIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

type Props = {
  editContent?: React.ReactNode;
  composeContent?: React.ReactNode;
  settingsContent?: React.ReactNode;
};

export const ToolbarWrapper = ({ editContent, composeContent, settingsContent }: Props) => {
  const { id } = useNode((node) => ({
    text: node.data.props.text,
    width: node.data.props.width,
  }));
  const {
    actions: { delete: deleteNode },
  } = useEditor();
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <span>Text</span>
        <div>
          <Button size="sm" variant="ghost">
            <CopyIcon className="size-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <TrashIcon onClick={() => deleteNode(id)} className="size-4" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="edit" className="w-full px-2">
        <TabsList className="w-full [&>button]:w-1/3">
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
          {!!settingsContent &&<TabsTrigger value="settings">
            <SettingsIcon />
            <span className="sr-only">Advanced settings</span>
          </TabsTrigger>}
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
