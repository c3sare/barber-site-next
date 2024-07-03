"use client";

import { FileLibraryType } from "@/actions/admin/file-library/getFilesFromFilesLibrary";
import { createContext, useContext } from "react";

type FilesLibraryContextType = {
  deleteFilesFromState: (filesIds: string[]) => void;
  addFilesToState: (files: FileLibraryType[]) => void;
  updateFileInState: (file: FileLibraryType) => void;
} | null;

export const FilesLibraryContext = createContext<FilesLibraryContextType>(null);

export const useFilesLibraryContext = () => {
  const ctx = useContext(FilesLibraryContext);

  if (!ctx) throw new Error("Hook is used out of FilesLibraryContextProvider");

  return ctx;
};

export const FilesLibraryProvider: React.FC<
  React.PropsWithChildren & NonNullable<FilesLibraryContextType>
> = ({ children, ...rest }) => (
  <FilesLibraryContext.Provider value={rest}>
    {children}
  </FilesLibraryContext.Provider>
);
