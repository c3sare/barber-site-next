import { db } from "@/lib/db";
import { FooterFormSwitcher } from "../_components/FooterFormSwitcher";

export default async function NewComponentPage() {
  const images = (await db.file.findMany({})).map((img) => ({
    id: img.id,
    name: img.name,
    url: img.url,
  }));

  return (
    <div className="mx-auto max-w-2xl">
      <FooterFormSwitcher images={images} />
    </div>
  );
}
