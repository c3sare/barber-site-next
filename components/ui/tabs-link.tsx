"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabsListProps = {
  children?: React.ReactNode;
  className?: string;
};

type TabLinkProps = {
  children?: React.ReactNode;
  href: string;
  className?: string;
};

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center rounded-md bg-muted p-1 text-muted-foreground max-w-full overflow-x-auto scroll no-scrollbar",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsLink = ({ children, href, className }: TabLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xs px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive && "bg-background text-foreground shadow-xs",
        className
      )}
    >
      {children}
    </Link>
  );
};
