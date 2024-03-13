/* eslint-disable @next/next/no-img-element */
"use client";

import { CloudArrowIcon } from "@/components/icons/CloudArrowIcon";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

export const FileUploadArea = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) {
      setFiles((prev) => [...prev, ...files]);
    }
  };

  const handleOnDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...files]);
  };

  const handleDeleteItem = (index: number) => {
    setFiles((prev) => prev.filter((_item, i) => i !== index));
  };

  return (
    <div className="max-w-xl mt-4 relative">
      <label
        onDrop={handleOnDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
      >
        <span
          className={cn(
            "flex items-center space-x-2",
            !!files.length && "invisible"
          )}
        >
          <CloudArrowIcon className="text-gray-600" />
          <span className="font-medium text-gray-600">
            Drop files to Attach, or{" "}
            <span className="text-primary underline">browse</span>
          </span>
        </span>
        <input
          ref={inputRef}
          type="file"
          onChange={handleOnChange}
          name="file_upload"
          className="hidden"
          multiple
        />
      </label>
      {!!files.length && (
        <div className="flex gap-2 h-full w-full absolute top-0 p-2">
          {files.map((item, i) => (
            <button
              className="w-16 h-16 rounded-xl overflow-hidden group relative"
              key={i}
              onClick={() => handleDeleteItem(i)}
            >
              <img
                src={URL.createObjectURL(item)}
                alt={`Image Upload ${i + 1}`}
                className="h-16 object-cover"
              />
              <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center opacity-0 bg-black/50 group-hover:opacity-100 transition-opacity">
                <Cross1Icon className="text-white" width={24} height={24} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
