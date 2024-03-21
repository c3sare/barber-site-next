import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user.id || session?.user.role !== "ADMIN") return notFound();

  return (
    <div className="w-full max-w-7xl p-4 mx-auto">
      <NavigationMenu className="z-auto">
        <NavigationMenuList>
          <NavigationMenuLink href="/admin">Home</NavigationMenuLink>
          <NavigationMenuLink href="/admin/file-library">
            File Library
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-full p-4">{children}</div>
    </div>
  );
}
