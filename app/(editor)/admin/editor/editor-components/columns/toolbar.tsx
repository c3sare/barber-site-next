import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SizeInput } from "../toolbar-elements/size-input";
import { ToolbarWrapper } from "../toolbar-wrapper";
import { SelectInput } from "../toolbar-elements/select-input";
import { useNode } from "@craftjs/core";

export const ColumnsToolbar = () => {
  const { heightVariant } = useNode((node) => ({
    heightVariant: node.data.props.heightVariant,
  }));

  return (
    <ToolbarWrapper
      editDesign={
        <Accordion type="multiple" defaultValue={["layout", "size", "spacing"]}>
          <AccordionItem value="layout">
            <AccordionTrigger>Layout</AccordionTrigger>
            <AccordionContent>
              <SelectInput
                title="Stack Vertically"
                object_key="vertical"
                withoutSizes
                options={[
                  {
                    value: "2xl",
                    label: "Desktop",
                  },
                  {
                    value: "xl",
                    label: "Tablet Landscape",
                  },
                  {
                    value: "lg",
                    label: "Tablet Portrait",
                  },
                  {
                    value: "md",
                    label: "Phone Landscape",
                  },
                  {
                    value: "sm",
                    label: "Phone Portrait",
                  },
                ]}
              />
              <SelectInput
                title="50% Width"
                object_key="halfWidth"
                withoutSizes
                options={[
                  {
                    value: "2xl",
                    label: "Desktop",
                  },
                  {
                    value: "xl",
                    label: "Tablet Landscape",
                  },
                  {
                    value: "lg",
                    label: "Tablet Portrait",
                  },
                  {
                    value: "md",
                    label: "Phone Landscape",
                  },
                  {
                    value: "sm",
                    label: "Phone Portrait",
                  },
                ]}
              />
              <SelectInput
                title="Reverse Order"
                object_key="reverseOrder"
                withoutSizes
                options={[
                  {
                    value: "2xl",
                    label: "Desktop",
                  },
                  {
                    value: "xl",
                    label: "Tablet Landscape",
                  },
                  {
                    value: "lg",
                    label: "Tablet Portrait",
                  },
                  {
                    value: "md",
                    label: "Phone Landscape",
                  },
                  {
                    value: "sm",
                    label: "Phone Portrait",
                  },
                ]}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <SizeInput title="Width" range={[0, 0]} object_key="width" />
              <SelectInput
                title="Height"
                object_key="heightVariant"
                options={[
                  {
                    value: "fit-to-content",
                    label: "Fit to content",
                  },
                  {
                    value: "expand-to-fill",
                    label: "Expand to fill",
                  },
                  {
                    value: "custom",
                    label: "Custom",
                  },
                ]}
              />
              {heightVariant === "custom" && (
                <SizeInput
                  title="Min height"
                  object_key="height"
                  range={[0, 0]}
                  hideDeviceSelect
                />
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="spacing">
            <AccordionTrigger>Spacing</AccordionTrigger>
            <AccordionContent>
              <SizeInput
                title="Column Gap"
                range={[0, 0]}
                object_key="columnGap"
              />
              <SizeInput
                title="Column Padding"
                range={[0, 0]}
                object_key="columnPadding"
              />
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
