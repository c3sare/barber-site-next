"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LoadingButton = ({
  children,
  disabled,
  className,
  ...props
}: Props) => {
  return (
    <Button disabled={disabled} className={cn("", className)} {...props}>
      {disabled ? <Loader2 className="animate-spin size-6" /> : children}
    </Button>
  );
};
