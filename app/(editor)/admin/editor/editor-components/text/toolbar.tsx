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
import { SizeInput } from "./size-input";
import { ToolbarWrapper } from "../toolbar-wrapper";

export const TextToolbar = () => {
  const {
    actions: { setProp },
    text,
    width,
    fontSize,
    marginBottom,
    marginTop,
  } = useNode((node) => ({
    text: node.data.props.text,
    width: node.data.props.width,
    fontSize: node.data.props.fontSize,
    marginBottom: node.data.props.marginBottom,
    marginTop: node.data.props.marginTop,
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
      composeContent={
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
              <SizeInput
                title="Font Size"
                range={[10, 128]}
                sizes={fontSize}
                object_key="fontSize"
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
