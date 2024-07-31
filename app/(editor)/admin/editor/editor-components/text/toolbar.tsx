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
import { TextareaInput } from "../toolbar-elements/textarea-input";

export const TextToolbar = () => {
  return (
    <ToolbarWrapper
      editContent={
        <TextareaInput title="Text" object_key="text" placeholder="Text..." />
      }
      editDesign={
        <Accordion
          type="multiple"
          defaultValue={["size", "typography", "spacing"]}
        >
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <SizeInput title="Width" range={[0, 1200]} object_key="width" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="typography">
            <AccordionTrigger>Typography</AccordionTrigger>
            <AccordionContent>
              <ColorInput title="Color" object_key="color" />
              <SelectToggle
                title="Alignment"
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
              <FontSelect title="Font" object_key="font" />
              <SizeInput
                title="Font Size"
                range={[10, 128]}
                object_key="fontSize"
              />
              <SelectInput
                title="Weight"
                object_key="weight"
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
                object_key="marginTop"
              />
              <SizeInput
                title="Margin Bottom"
                range={[0, 0]}
                object_key="marginBottom"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
    />
  );
};
