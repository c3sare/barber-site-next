"use client";

import { Control, FieldValues, Path, type PathValue } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InputHTMLAttributes } from "react";

type FormInput<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  description?: React.ReactNode;
  placeholder?: string;
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
  autoComplete?: string;
  disabled?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
};

export const FormInput = <T extends FieldValues>({
  control,
  name,
  description,
  placeholder,
  label,
  type,
  className,
  autoComplete,
  disabled,
  defaultValue,
}: FormInput<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
            />
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
