"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";

type FormInput<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  description?: React.ReactNode;
  label: string;
  className?: string;
  options: (
    | {
        value: string;
        label: string;
      }
    | string
  )[];
  disabled?: boolean;
};

const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  options,
  disabled,
}: FormInput<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={field.disabled}
              className={cn("flex flex-col space-y-1", className)}
            >
              {options.map((option) => {
                const value =
                  typeof option === "string" ? option : option.value;
                const label =
                  typeof option === "string" ? option : option.label;
                return (
                  <FormItem
                    key={value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={value} />
                    </FormControl>
                    <FormLabel className="font-normal">{label}</FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormRadioGroup;
