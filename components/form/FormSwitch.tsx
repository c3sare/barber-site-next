"use client";

import { Control, FieldValue, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

type FormSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  description?: React.ReactNode;
  label: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: FieldValue<T>;
};

const FormSwitch = <T extends FieldValues>({
  control,
  name,
  description,
  label,
  className,
  disabled,
  defaultValue,
}: FormSwitchProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, ...rest } }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs",
            className
          )}
        >
          <div className="flex flex-col gap-0.5">
            <FormLabel>{label}</FormLabel>
            {!!description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={value} onCheckedChange={onChange} {...rest} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormSwitch;
