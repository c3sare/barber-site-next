import { db } from "@/lib/db";
import { FooterFormSwitcher } from "../_components/FooterFormSwitcher";

export default async function NewComponentPage() {
  const images = await db.file.findMany({
    select: {
      id: true,
      name: true,
      url: true,
    },
  });

  return (
    <div className="mx-auto max-w-2xl">
      <FooterFormSwitcher images={images} />
    </div>
  );
}
