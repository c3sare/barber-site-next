import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button } from "@/components/ui/button";
import { ourOfficesData } from "./_data/ourOfficesData";
import { siteLinksData } from "./_data/siteLinksData";
import { stylesData } from "../(pages)/(index)/_data/stylesData";
import LinkListItem from "./_components/LinkListItem";
import ImageItem from "../../../components/LightboxImageItem";
import { Gallery } from "../../../components/lightbox";

const LayoutFooter: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <footer className="relative overflow-hidden text-[#777] block bg-[#0c0c0c] py-24">
        <div className="max-w-7xl mx-auto p-4">
          <div className="w-full md:w-1/2 lg:w-1/4 float-left px-4 mb-6">
            <Image src={logo} alt="Logo" width={228} />
            <p className="text-sm leading-7">
              Fusce non nulla quis leo lobortis porttitor. Quisque mi egestas
              nibh porttitor molestie. Nullam ut orci elit. Suspendisse
              tincidunt dapibus blandit. In nibh eu justo ultrices posuere.
            </p>
            <Button size="lg">READ MORE</Button>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 float-left px-4 mb-6">
            <h4 className="text-white before:content-none after:bg-white ">
              OUR OFFICE{"'"}S
            </h4>
            <ul className="flex flex-col gap-2">
              {ourOfficesData.map((office) => (
                <LinkListItem
                  id={office.id}
                  key={office.id}
                  href={"/" + office.city}
                  name={`${office.city} / ${office.country.toUpperCase()}`}
                />
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 float-left px-4 mb-6">
            <h4 className="text-white before:content-none after:bg-white ">
              FLICKR STREAM
            </h4>
            <Gallery withCaption>
              {stylesData.map((item, i) => (
                <ImageItem key={i} src={item} i={i} />
              ))}
            </Gallery>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/6 float-left px-4 mb-6">
            <h4 className="text-white before:content-none after:bg-white">
              SITE LINKS
            </h4>
            <ul className="flex flex-col gap-2">
              {siteLinksData.map((siteLink) => (
                <LinkListItem key={siteLink.id} {...siteLink} />
              ))}
            </ul>
          </div>
          <div className="clear-both" />
        </div>
      </footer>
      <div className="w-full bg-[rgb(36,36,36)] text-white py-8">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>2023 Barberia</p>
        </div>
      </div>
    </>
  );
};

export default LayoutFooter;
