import { db } from "@/lib/db";
import { HeroForm } from "../_components/HeroForm";

export default async function NewComponentPage() {
  const images = (await db.file.findMany({})).map((img) => ({
    id: img.id,
    name: img.name,
    url: img.url,
  }));

  return <HeroForm images={images} />;
}
