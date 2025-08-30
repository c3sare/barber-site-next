import db from "@/lib/drizzle";
import { GalleryForm } from "../_components/GalleryForm";
import { LinkBoxForm } from "../_components/LinkBoxForm";
import { HeroForm } from "../_components/HeroForm";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import * as z from "zod/mini";
import { galleryComponentSchema } from "@/validators/galleryComponentSchema";
import { linkBoxSchema } from "@/validators/linkBoxSchema";
import { notFound } from "next/navigation";

type FooterComponentEditPageProps = { params: Promise<{ id: string }> };

type PhotoGalleryValues = z.infer<typeof galleryComponentSchema>;

type LinkBoxValues = z.infer<typeof linkBoxSchema>;

type HeroBoxValues = z.infer<typeof heroComponentSchema>;

export default async function FooterComponentEditPage({
  params,
}: FooterComponentEditPageProps) {
  const { id } = await params;
  const images = await db.query.file.findMany({
    columns: { id: true, name: true, url: true },
  });

  const component = await db.query.footerComponent.findFirst({
    where: (footerComponent, { eq }) => eq(footerComponent.id, Number(id)),
  });

  const componentData = component!.data;

  switch (component?.component) {
    case "PHOTO_GALLERY":
      return (
        <GalleryForm
          images={images}
          id={component.id}
          defaultValues={componentData as PhotoGalleryValues}
        />
      );
    case "LINK_BOX":
      return (
        <LinkBoxForm
          id={component.id}
          defaultValues={componentData as LinkBoxValues}
        />
      );
    case "HERO_BOX":
      return (
        <HeroForm
          id={component.id}
          images={images}
          defaultValues={componentData as HeroBoxValues}
        />
      );
    default:
      return notFound();
  }
}
