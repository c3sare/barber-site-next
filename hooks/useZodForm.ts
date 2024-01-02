"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";

type PropsType<Z extends ZodSchema> = Omit<
  NonNullable<Parameters<typeof useForm<Z>>[0]>,
  "resolver"
> & {
  schema: Z;
};

export const useZodForm = <Z extends ZodSchema>({
  schema,
  ...props
}: PropsType<Z>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  return {
    ...useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      ...props,
    }),
    isLoading,
    setIsLoading,
    isError,
    setIsError,
  };
};
