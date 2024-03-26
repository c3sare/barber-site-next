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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";

type FormTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  description?: React.ReactNode;
  placeholder?: string;
  label: string;
  className?: string;
  disabled?: boolean;
  values: {
    id: string;
    name: string;
    url: string;
  }[];
};

const FormSelectLibraryImage = <T extends FieldValues>({
  control,
  name,
  description,
  label,
  placeholder,
  className,
  disabled,
  values,
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
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {values.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    <Image
                      src={item.url}
                      alt={item.name}
                      width={72}
                      height={72}
                      className="object-cover"
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectLibraryImage;
