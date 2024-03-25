import { getFooterListComponents } from "@/actions/admin/footer/getFooterListComponents";
import Link from "next/link";

export default async function FooterGalleryPage() {
  const components = await getFooterListComponents();
  return (
    <div className="flex flex-col items-center justify-center">
      {components.map((component) => (
        <Link key={component.id} href={`/admin/footer/${component.id}`}>
          {component.component}
        </Link>
      ))}
    </div>
  );
}
