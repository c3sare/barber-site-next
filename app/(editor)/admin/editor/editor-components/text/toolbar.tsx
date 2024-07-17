import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditor, useNode } from "@craftjs/core";
import {
  CopyIcon,
  PaletteIcon,
  PencilIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WidthInput } from "./width-input";

export const TextToolbar = () => {
  const {
    actions: { delete: deleteNode },
  } = useEditor();
  const {
    id,
    actions: { setProp },
    text,
    width,
  } = useNode((node) => ({
    text: node.data.props.text,
    width: node.data.props.width,
  }));

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
          <TabsTrigger value="edit">
            <PencilIcon />
            <span className="sr-only">Basic settings</span>
          </TabsTrigger>
          <TabsTrigger value="compose">
            <PaletteIcon />
            <span className="sr-only">Style settings</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <SettingsIcon />
            <span className="sr-only">Advanced settings</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col gap-2" value="edit">
          <Card className="p-2">
            <Label>
              Text
              <Textarea
                value={text}
                className="resize-y"
                placeholder="Text"
                onChange={(e) =>
                  setProp(
                    (prop: { text: string }) => (prop.text = e.target.value)
                  )
                }
              />
            </Label>
          </Card>
        </TabsContent>
        <TabsContent value="compose">
          <Accordion
            type="multiple"
            defaultValue={["size", "typography", "spacing"]}
          >
            <AccordionItem value="size">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>
                <Card className="p-2 flex items-center justify-between">
                  <span className="w-1/2">Width</span>
                  <WidthInput {...width} />
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="typography">
              <AccordionTrigger>Typography</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="spacing">
              <AccordionTrigger>Spacing</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </>
  );
};
