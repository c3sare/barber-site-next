import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProfileInformationsForm from "./_components/forms/ProfileInformationsForm";
import ChangePasswordForm from "./_components/forms/ChangePasswordForm";
import AvatarChangeForm from "./_components/forms/AvatarChangeForm";
import { getCurrentUserProfileInformations } from "@/actions/getProfileInformation";
import { Suspense } from "react";

export default async function SettingsPage() {
  const profileInformations = await getCurrentUserProfileInformations();

  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-5xl text-center after:left-1/2 after:-translate-x-1/2">
        Settings
      </h1>
      <Accordion type="single" collapsible defaultValue="user-profile">
        <AccordionItem value="user-profile">
          <AccordionTrigger className="text-xl">
            Profile Informations
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-6 items-center justify-center flex-wrap md:flex-nowrap">
              <AvatarChangeForm />
              <Suspense fallback={null}>
                <ProfileInformationsForm
                  profileInformations={profileInformations}
                />
              </Suspense>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="user-password">
          <AccordionTrigger className="text-xl">
            Change Password
          </AccordionTrigger>
          <AccordionContent>
            <ChangePasswordForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
