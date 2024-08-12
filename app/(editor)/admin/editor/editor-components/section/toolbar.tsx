import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToolbarWrapper } from "../toolbar-wrapper";
import { SelectToggle } from "../toolbar-elements/select-toggle";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Grid2X2Icon, SettingsIcon } from "lucide-react";
import { LayoutSet } from "../toolbar-sets/layout-set";

export const SectionToolbar = () => {
  return (
    <ToolbarWrapper
      editDesign={
        <Accordion type="multiple">
          <AccordionItem value="layout">
            <AccordionTrigger>Layout</AccordionTrigger>
            <AccordionContent>
              <SelectToggle
                options={[
                  {
                    value: "vertical",
                    title: "Vertical",
                    icon: <DotsVerticalIcon />,
                  },
                  {
                    value: "horizontal",
                    title: "Horizontal",
                    icon: <DotsHorizontalIcon />,
                  },
                  {
                    value: "grid",
                    title: "Grid",
                    icon: <Grid2X2Icon />,
                  },
                  {
                    value: "advanced",
                    title: "Advanced",
                    icon: <SettingsIcon />,
                  },
                ]}
                withoutSizes
                object_key="layout"
                title="Layout"
              />
              <LayoutSet />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="background">
            <AccordionTrigger>Background</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="spacing">
            <AccordionTrigger>Spacing</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="borders">
            <AccordionTrigger>Borders</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      }
    />
  );
};
