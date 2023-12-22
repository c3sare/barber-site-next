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
import { servicesData } from "./_data/servicesData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { openData } from "./_data/openData";
import { cn } from "@/lib/utils";
import { barbersData } from "./_data/barbersData";
import { testimonialsData } from "./_data/testimonialsData";
import SliderComments from "@/components/Slider";
import SliderCommentsItem from "@/components/SliderItem";

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
                <div className="h-[24px] w-full bg-[#f7f8fa]">
                  <div
                    className="h-[24px] bg-[#486b71] relative"
                    style={{ width: `${value}%` }}
                  >
                    <div className="absolute bottom-0 h-full text-xs py-1 w-8 text-center text-white right-0">
                      {value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Container wrapperClassName="bg-zinc-100" className="py-20">
        <div className="text-center">
          <Image
            alt="Dark hair"
            src="/images/dark-hr.png"
            className="mx-auto"
            width={100}
            height={33}
          />
          <h4 className="after:content-none before:content-none text-3xl">
            Our Services
          </h4>
        </div>
        <div className="w-full">
          {servicesData.map((service, i) => (
            <div key={i} className="w-full md:w-1/3 float-left pb-6">
              <div className="bg-white p-6 border-b-2 border-b-gray-300 flex flex-col items-center mx-6 shadow-sm pb-8 relative">
                <h4 className="text-center w-full after:left-1/2 after:-translate-x-1/2">
                  {service.title}
                </h4>
                <Image
                  className="max-w-full h-auto"
                  src={service.image}
                  alt={service.title}
                  width={320}
                  height={213}
                />
                <p className="text-xs">{service.description}</p>

                <Button
                  asChild
                  className="absolute top-full -translate-y-1/2 rounded-none"
                >
                  <Link href={service.href}>READ MORE</Link>
                </Button>
              </div>
            </div>
          ))}
          <div className="clear-both" />
        </div>
      </Container>
      <Container
        bgImageUrl="/images/parallax/parallax_01.jpg"
        parallax
        className="py-24"
      >
        <div className="z-10 flex justify-center items-center flex-col">
          <Image
            src="/images/white-hr.png"
            alt="Beard image"
            width={126}
            height={45}
          />
          <h4 className="after:content-none text-white before:content-none text-center text-3xl">
            Our opening hours
          </h4>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {openData.map((item) => (
            <div
              key={item.shortDay}
              className={cn(
                "text-white border-b-[3px] border-b-[rgba(255,_255,_255,_0.3)] flex items-center gap-4 justify-center flex-col aspect-square min-w-[150px]",
                item.open ? "bg-[#486b71]" : "bg-[#a89d8e]"
              )}
            >
              <span className="text-3xl font-bold">{item.shortDay}</span>
              <span>
                {item.open ? `${item.start} - ${item.end}` : "CLOSED"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Button asChild variant="ghost">
            <Link
              className="mx-auto block text-white rounded-none border border-white"
              href="/book-now"
            >
              Book now
            </Link>
          </Button>
        </div>
      </Container>
      <Container wrapperClassName="bg-zinc-100" className="py-24">
        <div className="z-10 flex justify-center items-center flex-col">
          <Image
            src="/images/dark-hr-2.png"
            alt="Cutter image"
            width={100}
            height={33}
          />
          <h4 className="after:content-none text-black before:content-none text-center text-3xl">
            LICENSED BARBERS
          </h4>
        </div>
        <div>
          {barbersData.map((item) => (
            <div className="w-full md:w-1/2 xl:w-1/4 float-left" key={item.id}>
              <div className="flex flex-col items-center justify-center mx-4 bg-white shadow-sm gap-4 pt-6">
                <h4 className="w-full text-center after:left-1/2 after:-translate-x-1/2">
                  {item.name}
                </h4>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={222}
                  height={222}
                />
                <span className="text-2xl">AVAILABILITY</span>
                <div className="flex flex-col gap-2 items-center justify-center">
                  {item.availability.map((work) => (
                    <span key={work.day}>
                      {work.day} {work.start} {work.end}
                    </span>
                  ))}
                </div>
                <Button asChild>
                  <Link
                    href="/book-now"
                    className="translate-y-1/2 rounded-none"
                  >
                    BOOK NOW
                  </Link>
                </Button>
              </div>
            </div>
          ))}
          <div className="clear-both" />
        </div>
      </Container>
      <Container
        bgImageUrl="/images/parallax_02.jpg"
        parallax
        className="py-24 relative max-w-full"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_.4)]" />
        <div className="mx-auto max-w-7xl">
          <h4 className="text-4xl text-center text-white after:content-none before:content-none drop-shadow-xs opacity-90">
            Happy Testimonials
          </h4>
          <SliderComments>
            {testimonialsData.map((item) => (
              <SliderCommentsItem key={item.id}>
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h4>{item.name}</h4>
                <p>{item.content}</p>
              </SliderCommentsItem>
            ))}
          </SliderComments>
        </div>
      </Container>
    </main>
  );
}
