"use client";

import { Popover } from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const AccountPopover = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const [isVisibleAccount, setIsVisibleAccount] = useState<boolean>(false);

  useEffect(() => {
    setIsVisibleAccount(false);
  }, [pathname]);

  return (
    <Popover
      open={isVisibleAccount}
      onOpenChange={(state) => setIsVisibleAccount(state)}
    >
      {children}
    </Popover>
  );
};
