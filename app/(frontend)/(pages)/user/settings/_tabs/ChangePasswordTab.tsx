"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Suspense, lazy } from "react";
import { SkeletonChangePasswordForm } from "../_components/skeletons/SkeletonChangePasswordForm";

const ChangePasswordForm = lazy(
  () => import("../_components/forms/ChangePasswordForm")
);

export const ChangePasswordTab = () => (
  <AccordionItem value="user-password">
    <AccordionTrigger className="text-xl">Change Password</AccordionTrigger>
    <AccordionContent>
      <Suspense fallback={<SkeletonChangePasswordForm />}>
        <ChangePasswordForm />
      </Suspense>
    </AccordionContent>
  </AccordionItem>
);
