"use client";

import { Control, FieldValue, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Image from "next/image";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FormSelectLibraryImageProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  description?: React.ReactNode;
  label: string;
  className?: string;
  disabled?: boolean;
  values: {
    id: string;
    name: string;
    url: string;
  }[];
  defaultValue?: FieldValue<T>;
};

const FormSelectLibraryImage = <T extends FieldValues>({
  control,
  name,
  description,
  label,
  className,
  disabled,
  values,
  defaultValue
}: FormSelectLibraryImageProps<T>) => {
  const [isVisibleDropDown, setIsVisibleDropdown] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field }) => {
        const handleClickImage = (id: string) => {
          field.onChange(id);
          setIsVisibleDropdown(false);
        };

        const currentImage = values.find((item) => item.id === field.value);

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <DropdownMenu
                open={isVisibleDropDown}
                onOpenChange={setIsVisibleDropdown}
              >
                <DropdownMenuTrigger asChild>
                  <Card
                    className={cn(
                      "size-24 flex items-center justify-center cursor-pointer text-xs",
                      className
                    )}
                  >
                    {currentImage ? (
                      <Image
                        src={currentImage.url}
                        width={128}
                        height={128}
                        className="w-full aspect-square object-cover"
                        alt={currentImage.name}
                      />
                    ) : (
                      "Select image"
                    )}
                  </Card>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-full">
                  <ScrollArea className="h-72 pl-1 pr-3">
                    <div className="flex flex-wrap max-w-72">
                      {values.map((item) => (
                        <button
                          className="size-24 aspect-square"
                          key={item.id}
                          onClick={() => handleClickImage(item.id)}
                        >
                          <Image
                            src={item.url}
                            alt={item.name}
                            width={128}
                            height={128}
                            className="w-full aspect-square object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            {!!description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormSelectLibraryImage;
