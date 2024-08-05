import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProfileInformationsTab } from "./ProfileInformationsTab";
import { Typography } from "@/components/typography";
import { auth } from "@/auth.config";
import ChangePasswordForm from "./_components/forms/ChangePasswordForm";

export default async function SettingsPage() {
  const session = await auth();

  const isOAuthAccount = session?.user?.isOAuth;

  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <Typography
        tag="h1"
        className="text-5xl text-center after:left-1/2 after:-translate-x-1/2"
      >
        Settings
      </Typography>
      <Accordion type="single" collapsible defaultValue="user-profile">
        <AccordionItem value="user-profile">
          <AccordionTrigger className="text-xl">
            Profile Informations
          </AccordionTrigger>
          <AccordionContent>
            <ProfileInformationsTab />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="user-password">
          <AccordionTrigger className="text-xl">
            Change Password
          </AccordionTrigger>
          <AccordionContent>
            <ChangePasswordForm isOAuthAccount={isOAuthAccount} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
