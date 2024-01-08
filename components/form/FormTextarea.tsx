"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type FormTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  description?: React.ReactNode;
  placeholder?: string;
  label: string;
  className?: string;
  disabled?: boolean;
};

const FormTextarea = <T extends FieldValues>({
  control,
  name,
  description,
  label,
  placeholder,
  className,
  disabled,
}: FormTextareaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", className)}
              {...field}
            />
          </FormControl>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
