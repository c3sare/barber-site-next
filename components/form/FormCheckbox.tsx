"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type FormInput<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  description?: React.ReactNode;
  label: string;
  className?: string;
  disabled?: boolean;
};

const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  description,
  label,
  className,
  disabled,
}: FormInput<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field: { value, onChange, ...rest } }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow",
            className
          )}
        >
          <FormControl>
            <Checkbox checked={value} onCheckedChange={onChange} {...rest} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
