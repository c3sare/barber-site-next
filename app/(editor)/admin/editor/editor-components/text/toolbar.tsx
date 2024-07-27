import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNode } from "@craftjs/core";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SizeInput } from "../toolbar-elements/size-input";
import { ToolbarWrapper } from "../toolbar-wrapper";
import { SelectInput } from "../toolbar-elements/select-input";
import { SelectToggle } from "../toolbar-elements/select-toggle";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { ColorInput } from "../toolbar-elements/color-input";
import { FontSelect } from "../toolbar-elements/font-select";

export const TextToolbar = () => {
  const {
    actions: { setProp },
    text,
    width,
    fontSize,
    marginBottom,
    marginTop,
    weight,
    align,
    color,
    font,
  } = useNode((node) => ({
    text: node.data.props.text,
    width: node.data.props.width,
    fontSize: node.data.props.fontSize,
    marginBottom: node.data.props.marginBottom,
    marginTop: node.data.props.marginTop,
    weight: node.data.props.weight,
    align: node.data.props.align,
    color: node.data.props.color,
    font: node.data.props.font,
  }));

  return (
    <ToolbarWrapper
      editContent={
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
      }
      editDesign={
        <Accordion
          type="multiple"
          defaultValue={["size", "typography", "spacing"]}
        >
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <SizeInput
                sizes={width}
                title="Width"
                range={[0, 1200]}
                object_key="width"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="typography">
            <AccordionTrigger>Typography</AccordionTrigger>
            <AccordionContent>
              <ColorInput title="Color" sizes={color} object_key="color" />
              <SelectToggle
                title="Alignment"
                sizes={align}
                object_key="align"
                options={[
                  {
                    value: "left",
                    title: "Left",
                    icon: <AlignLeftIcon />,
                  },
                  {
                    value: "center",
                    title: "Center",
                    icon: <AlignCenterIcon />,
                  },
                  {
                    value: "right",
                    title: "Right",
                    icon: <AlignRightIcon />,
                  },
                  {
                    value: "justify",
                    title: "Justify",
                    icon: <AlignJustifyIcon />,
                  },
                ]}
              />
              <FontSelect title="Font" object_key="font" sizes={font} />
              <SizeInput
                title="Font Size"
                range={[10, 128]}
                sizes={fontSize}
                object_key="fontSize"
              />
              <SelectInput
                title="Weight"
                sizes={weight}
                object_key="weight"
                defaultValue="400"
                options={[
                  "100",
                  "200",
                  "300",
                  "400",
                  "500",
                  "600",
                  "700",
                  "800",
                  "900",
                ]}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="spacing">
            <AccordionTrigger>Spacing</AccordionTrigger>
            <AccordionContent>
              <SizeInput
                title="Margin Top"
                range={[0, 0]}
                sizes={marginTop}
                object_key="marginTop"
              />
              <SizeInput
                title="Margin Bottom"
                range={[0, 0]}
                sizes={marginBottom}
                object_key="marginBottom"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
    />
  );
};
