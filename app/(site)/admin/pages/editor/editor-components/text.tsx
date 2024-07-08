"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useEditor, useNode } from "@craftjs/core";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, PaletteIcon, PencilIcon, SettingsIcon } from "lucide-react";
import Sketch from "@uiw/react-color-sketch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ToolbarOptions = () => {
  const { actions: { delete: deleteNode } } = useEditor();
  const {
    id,
    actions: { setProp },
    fontSize,
    htmlTag,
    text,
    align,
    color,
    bold,
    italic,
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
          <TabsTrigger value="edit"><PencilIcon/></TabsTrigger>
          <TabsTrigger value="compose"><PaletteIcon/></TabsTrigger>
          <TabsTrigger value="settings"><SettingsIcon/></TabsTrigger>
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
          <span>HTML Tag</span>
          <Select
            value={htmlTag}
            onValueChange={(val) =>
              setProp((prop: { htmlTag: string }) => (prop.htmlTag = val))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select html tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="h1">H1</SelectItem>
                <SelectItem value="h2">H2</SelectItem>
                <SelectItem value="h3">H3</SelectItem>
                <SelectItem value="h4">H4</SelectItem>
                <SelectItem value="h5">H5</SelectItem>
                <SelectItem value="h6">H6</SelectItem>
                <SelectItem value="div">div</SelectItem>
                <SelectItem value="span">span</SelectItem>
                <SelectItem value="p">p</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
              setProp((prop: { text: string }) => (prop.text = e.target.value))
            }
          />
        </Label>
      </Card>
      <Card className="p-2">
        <ToggleGroup
          variant="outline"
          type="single"
          size="sm"
          value={align}
          onValueChange={(val) =>
            setProp((prop: { align: string }) => (prop.align = val))
          }
        >
          <Toggle
            size="sm"
            variant="outline"
            pressed={bold}
            onPressedChange={(val) =>
              setProp((prop: { bold: boolean }) => (prop.bold = val))
            }
          >
            <Bold className="size-3" />
          </Toggle>
          <Toggle
            size="sm"
            variant="outline"
            pressed={italic}
            onPressedChange={(val) =>
              setProp((prop: { italic: boolean }) => (prop.italic = val))
            }
          >
            <Italic className="size-3" />
          </Toggle>
          <Separator className="h-8 mx-0.5" orientation="vertical" />
          <ToggleGroupItem value="left">
            <AlignLeft className="size-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="size-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="size-3" />
          </ToggleGroupItem>
        </ToggleGroup>
      </Card>
      <Card className="p-2">
        <Label>
          <span>Color</span>
          <Popover>
            <PopoverTrigger
              className="p-2 rounded-lg w-full"
              style={{ backgroundColor: color }}
            >
              <span className="text-white mix-blend-difference">{color}</span>
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
      <Button variant="destructive" onClick={() => deleteNode(id)}>Delete node</Button>
        </TabsContent>
      </Tabs>
    </>
  );
};

type Props = {
  text?: string;
  fontSize?: number;
  htmlTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span" | "p";
  align?: "left" | "center" | "right";
  color?: string;
  bold?: boolean;
  italic?: boolean;
};

export const Text = ({
  text="Text",
  fontSize=24,
  htmlTag: Tag="p",
  align="left",
  color="#000000",
  bold=false,
  italic=false,
}: Props) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag
      ref={(ref) => {
        connect(ref!);
      }}
      className={cn(aligns[align], bold && "font-bold", italic && "italic")}
      style={{ fontSize: `${fontSize}px`, color }}
      onKeyUp={(e) => {
        setProp((props: { text: string }) => {
          props.text = e.currentTarget.innerText;
        });
      }}
      dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br/>") }}
    />
  );
};

Text.craft = {
  props: {
    fontSize: 24,
    htmlTag: "p",
    text: "Text",
    align: "left",
    color: "#000000",
    bold: false,
    italic: false,
  },
  related: {
    toolbar: ToolbarOptions,
  },
};
