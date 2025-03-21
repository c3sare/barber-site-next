import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditor, useNode } from "@craftjs/core";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  PaletteIcon,
  PencilIcon,
  SettingsIcon,
} from "lucide-react";
import Sketch from "@uiw/react-color-sketch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "./rich-text-editor";

export const tags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "div",
  "span",
  "p",
] as const;

export const alignItems = [
  {
    value: "left",
    icon: AlignLeft,
  },
  {
    value: "center",
    icon: AlignCenter,
  },
  {
    value: "right",
    icon: AlignRight,
  },
  {
    value: "justify",
    icon: AlignJustify,
  },
] as const;

export const TextToolbar = () => {
  const {
    actions: { delete: deleteNode },
  } = useEditor();
  const {
    id,
    actions: { setProp },
    fontSize,
    text,
    color,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    htmlTag: node.data.props.htmlTag,
    text: node.data.props.text,
    align: node.data.props.align,
    color: node.data.props.color,
    bold: node.data.props.bold,
    italic: node.data.props.italic,
  }));

  return (
    <>
      <Tabs defaultValue="edit" className="w-full">
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
            <Label className="flex flex-col gap-2">
              <span>Font size ({fontSize}px)</span>
              <Slider
                value={[fontSize]}
                onValueChange={(val) =>
                  setProp(
                    (prop: { fontSize: number }) =>
                      (prop.fontSize = val.at(0) ?? 24)
                  )
                }
                min={10}
                max={48}
                step={1}
              />
            </Label>
          </Card>
          <Card className="p-2">
            <Label>
              <span>Text</span>
              <Textarea
                value={text}
                className="resize-none"
                placeholder="Text"
                onChange={(e) =>
                  setProp(
                    (prop: { text: string }) => (prop.text = e.target.value)
                  )
                }
              />
            </Label>
          </Card>
          <Card className="p-2">
            <Label>
              <span>Color</span>
              <Popover>
                <PopoverTrigger
                  className="p-2 rounded-lg w-full"
                  style={{ backgroundColor: color }}
                >
                  <span className="text-white mix-blend-difference">
                    {color}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Sketch
                    color={color}
                    disableAlpha
                    onChange={(color) => {
                      setProp(
                        (prop: { color: string }) => (prop.color = color.hex)
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Label>
          </Card>
          <Button variant="destructive" onClick={() => deleteNode(id)}>
            Delete node
          </Button>
          <Editor />
        </TabsContent>
      </Tabs>
    </>
  );
};
