import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl py-8">
      <h1 className="text-5xl text-center after:left-1/2 after:-translate-x-1/2">
        Settings
      </h1>
      <Accordion type="single" collapsible defaultValue="user-profile">
        <AccordionItem value="user-profile">
          <AccordionTrigger className="text-xl">
            Profile Informations
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="user-password">
          <AccordionTrigger className="text-xl">
            Change Password
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
