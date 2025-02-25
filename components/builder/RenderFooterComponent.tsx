import { getFooterComponents } from "@/actions/admin/footer/getFooterComponents";
import { HeroBox } from "./HeroBox";
import { LinkBox } from "./LinkBox";
import { PhotoGallery } from "./PhotoGallery";

type RenderFooterComponent = Awaited<
  ReturnType<typeof getFooterComponents>
>[number];

export const RenderFooterComponent = ({
  images,
  data,
  component,
}: RenderFooterComponent) => {
  const componentData = data as never;

  switch (component) {
    default:
      return null;
    case "HERO_BOX":
      return <HeroBox data={componentData} images={images} />;
    case "LINK_BOX":
      return <LinkBox data={componentData} images={images} />;
    case "PHOTO_GALLERY":
      return <PhotoGallery data={componentData} images={images} />;
  }
};
