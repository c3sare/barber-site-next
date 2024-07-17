import { Accordion } from "@/components/ui/accordion";
import { ChangePasswordTab } from "./_tabs/ChangePasswordTab";
import { ProfileInformationsTab } from "./_tabs/ProfileInformationsTab";
import { Suspense } from "react";
import { SkeletonAccordionTrigger } from "./_components/skeletons/SkeletonAccordionTrigger";
import { SkeletonProfileInformationsForm } from "./_components/skeletons/SkeletonProfileInformationsForm";
import { Typography } from "@/components/typography";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <Typography
        tag="h1"
        className="text-5xl text-center after:left-1/2 after:-translate-x-1/2"
      >
        Settings
      </Typography>
      <Accordion type="single" collapsible defaultValue="user-profile">
        <Suspense
          fallback={
            <SkeletonAccordionTrigger>
              <SkeletonProfileInformationsForm />
            </SkeletonAccordionTrigger>
          }
        >
          <ProfileInformationsTab />
        </Suspense>
        <ChangePasswordTab />
      </Accordion>
    </div>
  );
}
