"use client";

import {
  Control,
  FieldValue,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

type FormComboboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label: string;
  description?: string;
  options: {
    value: FieldValue<T>;
    label: string;
  }[];
};

const FormCombobox = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  description,
  options,
}: FormComboboxProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : placeholder}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        form.setValue(name, option.value);
                      }}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCombobox;
