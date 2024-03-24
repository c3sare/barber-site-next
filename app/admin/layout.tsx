import { auth } from "@/auth";
import { notFound } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user.id || session?.user.role !== "ADMIN") return notFound();

  return (
    <div className="w-full max-w-7xl p-4 mx-auto">
      <div className="flex">
        <NavigationMenu className="z-auto">
          <NavigationMenuList>
            <NavigationMenuLink href="/admin" title="Home" />
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="z-auto">
          <NavigationMenuList>
            <NavigationMenuLink href="/admin/footer" title="Footer">
              <NavigationMenuLink
                href="/admin/footer/gallery"
                title="Gallery"
              />
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="z-auto">
          <NavigationMenuList>
            <NavigationMenuLink
              href="/admin/file-library"
              title="File Library"
            />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-full p-4">{children}</div>
    </div>
  );
}
