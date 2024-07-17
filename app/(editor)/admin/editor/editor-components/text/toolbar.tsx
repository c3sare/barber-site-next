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
import { WidthInput } from "./width-input";
import { ToolbarWrapper } from "../toolbar-wrapper";

export const TextToolbar = () => {
  const {
    actions: { setProp },
    text,
    width,
  } = useNode((node) => ({
    text: node.data.props.text,
    width: node.data.props.width,
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
      }
    />
  );
};
