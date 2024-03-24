"use client";

import React from "react";
import { DataTable } from "./DataTable";
import { FileLibraryType } from "@/actions/admin/file-library/getFilesFromFilesLibrary";
import { columns } from "./columns";
import { FilesLibraryProvider } from "../_context/FilesLibraryContext";

type FilesTableProps = {
  files: FileLibraryType[];
};

export const FilesTable: React.FC<FilesTableProps> = ({ files }) => {
  const [state, setState] = React.useState<FileLibraryType[]>(files);

  const deleteFilesFromState = (fileIds: string[]) => {
    setState((state) =>
      state.filter((item) => !fileIds.includes((item as { id: string }).id))
    );
  };

  const addFilesToState = (items: FileLibraryType[]) =>
    setState((state) => [...state, ...items]);

  const updateFileInState = (file: FileLibraryType) =>
    setState((state) =>
      state.map((item) => (item.id === file.id ? file : item))
    );

  return (
    <FilesLibraryProvider
      addFilesToState={addFilesToState}
      deleteFilesFromState={deleteFilesFromState}
      updateFileInState={updateFileInState}
    >
      <DataTable
        data={state}
        columns={columns({
          addFilesToState,
          deleteFilesFromState,
          updateFileInState,
        })}
      />
    </FilesLibraryProvider>
  );
};
