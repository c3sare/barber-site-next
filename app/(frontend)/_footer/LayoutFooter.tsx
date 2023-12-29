import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button } from "@/components/ui/button";
import { ourOfficesData } from "./_data/ourOfficesData";
import Link from "next/link";
import { siteLinksData } from "./_data/siteLinksData";
import { ZoomIcon } from "@/components/icons/ZoomIcon";
import { stylesData } from "../(pages)/(index)/_data/stylesData";

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
            <Button className="rounded-none px-8">READ MORE</Button>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 float-left px-4 mb-6">
            <h4 className="text-white before:content-none after:bg-white ">
              OUR OFFICE{"'"}S
            </h4>
            <ul className="flex flex-col gap-2">
              {ourOfficesData.map((office) => (
                <li
                  key={office.id}
                  className="before:content-['>'] before:font-bold flex gap-1 text-sm"
                >
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors duration-500"
                  >
                    {office.city} / {office.country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 float-left px-4 mb-6">
            <h4 className="text-white before:content-none after:bg-white ">
              FLICKR STREAM
            </h4>
            <div className="w-full flex-wrap flex">
              {stylesData.map((src, i) => (
                <div key={i} className="w-1/4 group relative">
                  <Image
                    className="max-w-full"
                    alt={`Fryzura ${i + 1}`}
                    src={src}
                    width={200}
                    height={200}
                  />
                  <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-[rgba(0,_0,_0,_.6)] flex items-center justify-center duration-500 transition-opacity">
                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                      <ZoomIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/6 float-left px-4 mb-6">
            <h4 className="text-white before:content-none after:bg-white ">
              SITE LINKS
            </h4>
            <ul className="flex flex-col gap-2">
              {siteLinksData.map((siteLink) => (
                <li
                  key={siteLink.id}
                  className="before:content-['>'] before:font-bold flex gap-1 text-sm"
                >
                  <Link
                    href={siteLink.href}
                    className="hover:text-primary transition-colors duration-500"
                  >
                    {siteLink.name}
                  </Link>
                </li>
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
