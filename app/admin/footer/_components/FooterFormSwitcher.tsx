"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { HeroForm } from "./HeroForm";
import { LinkBoxForm } from "./LinkBoxForm";

type ImagesType = { id: string; name: string; url: string }[];

type FormSwitchProps = {
  currentValue: string;
  images: ImagesType;
};

const formWithComponents = [
  {
    value: "HERO_BOX",
    name: "Hero Box",
    component: HeroForm,
  },
  {
    value: "LINK_BOX",
    name: "Link Box",
    component: LinkBoxForm,
  },
] as const;

export const FooterFormSwitcher: React.FC<
  Omit<FormSwitchProps, "currentValue">
> = ({ images }) => {
  const [currentForm, setCurrentForm] = useState<string>(
    formWithComponents[0].value
  );

  const form = formWithComponents.find((form) => form.value === currentForm);

  if (!form) throw new Error("Footer Form don't exists.");

  return (
    <>
      <Select value={currentForm} onValueChange={setCurrentForm}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formWithComponents.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <form.component images={images} />
    </>
  );
};
