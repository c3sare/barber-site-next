import Slider from "./_components/Slider";
import SlideItem from "./_components/SlideItem";
import { sliderData } from "./_data/sliderData";
import Container from "@/components/container";
import Image from "next/image";
import { prosData } from "./_data/prosData";
import AppoitnmentForm from "./_components/AppoitmentForm";
import { stylesData } from "./_data/stylesData";
import { ZoomIcon } from "@/components/icons/ZoomIcon";
import { expData } from "./_data/expData";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <Slider>
        {sliderData.map((item, i) => (
          <SlideItem
            key={i}
            index={i}
            backgroundUrl={item.image}
            itemsAlign={item.align as "left" | "right" | "center"}
          >
            {item.components}
          </SlideItem>
        ))}
      </Slider>
      <Container bgImageUrl="/images/white-bg.png">
        <div>
          <div className="p-5 my-8 w-full flex-1 md:flex-auto md:w-2/3 float-left bg-white shadow-[0_3px_0_#f0f1f3]">
            <h4>Welcome to the Barberia</h4>
            <p className="italic pb-1 leading-8 relative w-auto text-base mb-5">
              The Barberia opened in the fall of 1989. We specialize in cutting
              mens hair and shaving their faces. Let{"'"}s see all our awesome
              features below! Thanks for choose us!
            </p>
            <p className="pb-1 mb-3">
              Lorem Ipsum, you need to be sure there isn{"'"}t anything emb. All
              the Lorem Ipsum on the Internet tend to repeat predefined chunks
              as necessary, making this the first true generator on the
              Internet.
            </p>
            <div className="w-full flex flex-wrap md:flex-nowrap">
              {prosData.map((pro, i) => (
                <div key={i} className="w-full md:w-1/3">
                  <Image
                    className="float-left m-[6px_20px_6px_0] block align-middle"
                    alt="Cutters"
                    src={pro.icon}
                    width={60}
                    height={60}
                  />
                  {pro.text}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 float-left">
            <AppoitnmentForm />
          </div>
        </div>
      </Container>
      <Container className="py-4">
        <div className="w-full md:w-1/2 float-left md:pr-[15px]">
          <h4>Beard & Hair styles</h4>
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
        <div className="w-full sm:w-1/2 md:w-1/4 float-left sm:pr-[15px] md:px-[15px]">
          <h4>Who we are</h4>
          <div className="w-full group relative mb-4">
            <Image
              alt="About Image"
              src="/images/about_01.jpg"
              className="max-w-full h-auto"
              width={720}
              height={475}
            />
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-[rgba(0,_0,_0,_.6)] flex items-center justify-center duration-500 transition-opacity">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <ZoomIcon />
              </div>
            </div>
          </div>
          <p className="mb-2 text-xs text-center text-zinc-500">
            The Barberia opened in the fall of 1989. We specialize in cutting
            mens hair and shaving their faces.
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 float-left sm:pl-[15px]">
          <h4>Company Experience</h4>
          <div>
            {expData.map(({ title, icon: Icon, value }, i) => (
              <div key={i} className="my-8">
                <div className="flex items-center gap-2 mb-[10px]">
                  <Icon width={16} height={16} />
                  <span className="text-xs">{title}</span>
                </div>
                <div className="h-[10px] w-full bg-[#f7f8fa]">
                  <div
                    className="h-[10px] bg-[#486b71] relative"
                    style={{ width: `${value}%` }}
                  >
                    <div className="absolute bottom-[calc(100%_+_10px)] text-xs py-1 w-8 text-center text-white right-0 bg-[#486b71]">
                      {value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
