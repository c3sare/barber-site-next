/* eslint-disable @next/next/no-img-element */
"use client";

import { CloudArrowIcon } from "@/components/icons/CloudArrowIcon";
import { generateToken } from "@/utils/generateToken";
import { Cross1Icon } from "@radix-ui/react-icons";
import React, { useRef } from "react";
import {
  Control,
  FieldValue,
  FieldValues,
  Path,
  useController,
  useWatch,
} from "react-hook-form";

type FileWithId = {
  file: File;
  id: string;
};

type FileUploadAreaProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  disabled?: boolean;
};

export const FileUploadArea = <T extends FieldValues>({
  name,
  control,
  disabled,
}: FileUploadAreaProps<T>) => {
  const { field } = useController({
    name,
    control,
    defaultValue: [] as FieldValue<T>,
  });

  const filesWatch = useWatch({
    control,
    name,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) {
      field.onChange([
        ...field.value,
        ...files.map((item) => ({
          id: generateToken(),
          file: item,
        })),
      ]);
    }
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    field.onChange([
      ...field.value,
      ...files.map((item) => ({
        id: generateToken(),
        file: item,
      })),
    ]);
  };

  const handleDeleteItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    field.onChange(filesWatch.filter((file: FileWithId) => file.id !== id));
  };

  return (
    <div className="max-w-2xl w-full mt-4 relative">
      <div
        onDrop={handleOnDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        className="flex justify-center w-full min-h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none"
      >
        {!filesWatch?.length && (
          <button
            className="flex items-center space-x-2"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
          >
            <CloudArrowIcon className="text-gray-600" />
            <span className="font-medium text-gray-600">
              Drop files to Attach, or{" "}
              <span className="text-primary underline">browse</span>
            </span>
          </button>
        )}
        {!!filesWatch?.length && (
          <div className="flex gap-2 w-full p-2 flex-wrap items-center">
            {filesWatch.map((item: FileWithId) => (
              <button
                className="w-32 h-32 rounded-xl overflow-hidden group relative"
                key={item.id}
                onClick={(e) => handleDeleteItem(e, item.id)}
                type="button"
              >
                <img
                  src={URL.createObjectURL(item.file)}
                  alt={`Image Upload ${item.id}`}
                  className="w-32 h-32 object-cover"
                />
                {!disabled && (
                  <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center opacity-0 bg-black/50 group-hover:opacity-100 transition-opacity">
                    <Cross1Icon className="text-white" width={24} height={24} />
                  </div>
                )}
              </button>
            ))}
            <button
              className="border rounded-xl w-32 h-32 hover:bg-black/10 text-4xl disabled:hover:bg-transparent disabled:opacity-80 disabled:cursor-not-allowed"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              type="button"
            >
              +
            </button>
          </div>
        )}
        <input
          disabled={disabled}
          ref={inputRef}
          type="file"
          onChange={handleOnChange}
          name={name}
          className="hidden"
          multiple
        />
      </div>
    </div>
  );
};
