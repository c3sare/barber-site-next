"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type AccountListItemProps = {
  icon: LucideIcon;
  title: string;
  href: string;
};

const AccountListItem: React.FC<AccountListItemProps> = ({
  title,
  href,
  icon: Icon,
}) => {
  return (
    <li>
      <Button
        asChild
        variant="link"
        className="flex gap-1 w-full justify-start"
      >
        <Link href={href}>
          <Icon className="w-6 h-6" />
          <span>{title}</span>
        </Link>
      </Button>
    </li>
  );
};

export default AccountListItem;
