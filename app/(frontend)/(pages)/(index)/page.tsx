import Slider from "./_components/Slider";
import SlideItem from "./_components/SlideItem";
import { sliderData } from "./_data/sliderData";
import Container from "@/components/container";
import Image from "next/image";
import { prosData } from "./_data/prosData";
import AppoitnmentForm from "./_components/AppoitmentForm";
import { stylesData } from "./_data/stylesData";
import { expData } from "./_data/expData";
import { servicesData } from "./_data/servicesData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { openData } from "./_data/openData";
import { cn } from "@/lib/utils";
import { barbersData } from "./_data/barbersData";
import { testimonialsData } from "./_data/testimonialsData";
import { blogData } from "./_data/blogData";
import { MessageCircleIcon, PenLineIcon, SearchIcon } from "lucide-react";
import { shopData } from "./_data/shopData";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { CommentCarousel } from "./_components/CommentCarousel";
import { Pros } from "./_components/pros";
import { ProItem } from "./_components/pros/ProItem";
import { WorksContainer } from "./_components/works";
import { WorkItem } from "./_components/works/WorkItem";
import { AboutImage } from "./_components/AboutImage";
import { ExperienceBar } from "./_components/ExperienceBar";

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
            <Pros>
              {prosData.map((pro, i) => (
                <ProItem key={i} {...pro} />
              ))}
            </Pros>
          </div>
          <div className="w-full md:w-1/3 float-left">
            <AppoitnmentForm />
          </div>
        </div>
      </Container>
      <Container className="py-4">
        <WorksContainer title="Beard & Hair styles">
          {stylesData.map((src, i) => (
            <WorkItem key={i} src={src} title={`Fryzura ${i + 1}`} />
          ))}
        </WorksContainer>
        <div className="w-full sm:w-1/2 md:w-1/4 float-left sm:pr-[15px] md:px-[15px]">
          <h4>Who we are</h4>
          <AboutImage src="/images/about_01.jpg" width={720} height={475} />
          <p className="mb-2 text-xs text-center text-zinc-500">
            The Barberia opened in the fall of 1989. We specialize in cutting
            mens hair and shaving their faces.
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 float-left sm:pl-[15px]">
          <h4>Company Experience</h4>
          <div>
            {expData.map((props, i) => (
              <ExperienceBar key={i} {...props} />
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
          <CommentCarousel>
            {testimonialsData.map((item) => (
              <div key={item.id} className="max-w-4xl mx-auto text-white">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
                <h4 className="text-center text-2xl after:content-none before:content-none text-white my-6">
                  {item.name}
                </h4>
                <p className="text-center text-base">{item.content}</p>
              </div>
            ))}
          </CommentCarousel>
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
            FROM THE BLOG
          </h4>
        </div>
        <div className="w-full">
          {blogData.map((post) => (
            <div
              key={post.id}
              className="float-left w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mb-8 self-stretch"
            >
              <div className="mx-2 p-1 bg-[#f7f8fa] flex flex-col items-center text-center shadow-sm self-stretch">
                <h4 className="before:content-none after:left-1/2 after:-translate-x-1/2 text-lg">
                  {post.title}
                </h4>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={250}
                  height={149}
                />
                <div className="flex items-center justify-center gap-4 w-full my-2 text-xs">
                  <div className="flex items-center gap-1">
                    <MessageCircleIcon width={20} height={20} /> {post.comments}{" "}
                    Comments
                  </div>
                  <div className="flex items-center gap-1">
                    <PenLineIcon width={20} height={20} /> by {post.author}
                  </div>
                </div>
                <p className="my-2 text-sm">{post.description}</p>
                <Button className="rounded-none relative top-2 translate-y-1/2">
                  READ MORE
                </Button>
              </div>
            </div>
          ))}
          <div className="clear-both" />
        </div>
      </Container>
      <Container
        bgImageUrl="/images/parallax_03.jpg"
        parallax
        wrapperClassName="after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-black after:opacity-60"
        className="py-24 font-bold text-center"
      >
        <div className="text-white text-2xl uppercase py-4 max-w-lg text-center mx-auto">
          support@barberia.com
        </div>
        <div className="text-[#242424] text-4xl uppercase py-4 bg-[rgba(255,_255,_255,_.5)] max-w-lg text-center mx-auto">
          +90 1234-567-890
        </div>
        <div className="text-white text-2xl uppercase py-4 max-w-lg text-center mx-auto">
          Envato inc 22 Elizabeth str. melbourne.
        </div>
        <div className="text-white text-2xl uppercase py-4 max-w-lg text-center mx-auto">
          victoria 8777. Australia
        </div>
      </Container>
      <Container className="py-24" wrapperClassName="bg-[#f7f8fa]">
        <div className="z-10 flex justify-center items-center flex-col">
          <Image
            src="/images/dark-hr-3.png"
            alt="Shop text"
            width={100}
            height={33}
          />
          <h4 className="after:content-none text-black before:content-none text-center text-3xl">
            FROM THE SHOP
          </h4>
        </div>
        <div className="w-full mb-6">
          {shopData.map((product) => (
            <div
              key={product.id}
              className="float-left w-full px-2 md:w-1/2 lg:w-1/4 mb-8"
            >
              <div className="p-1 bg-white shadow-sm w-full flex flex-col items-center justify-between">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={243}
                  height={243}
                />
                <span className="text-lg">{product.name}</span>
                <div className="flex gap-3 text-xs my-1">
                  {!!product.promo_cost && <span>${product.promo_cost}</span>}
                  <span className={cn(product.promo_cost && "line-through")}>
                    ${product.cost}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-1 text-[#eabe12]">
                  {[...Array(5)].map((_star, i) =>
                    i + 1 <= product.stars ? (
                      <StarFilledIcon width={16} height={16} key={i} />
                    ) : (
                      <StarIcon width={16} height={16} key={i} />
                    )
                  )}
                </div>
                <Button className="uppercase rounded-none flex items-center justify-center gap-3 relative top-1 translate-y-1/2">
                  <SearchIcon />
                  <span>|</span>
                  <span>Quick View</span>
                </Button>
              </div>
            </div>
          ))}
          <div className="clear-both" />
        </div>
        <div className="flex items-center justify-center my-14">
          <Button
            variant="outline"
            className="rounded-none max-w-full mx-auto px-8"
          >
            VIEW ALL ITEMS
          </Button>
        </div>
      </Container>
      <Container className="my-24">
        <div className="w-full flex items-end">
          <div className="float-left w-1/3 hidden lg:block">
            <div className="w-full relative block h-1">
              <Image
                alt="Award"
                src="/images/award.png"
                width={1170}
                height={1624}
                className="absolute bottom-[calc(100%_-_100px)] w-full block"
              />
            </div>
          </div>
          <div className="float-left w-full text-center lg:text-left lg:w-2/3">
            <h2 className="text-[#242424] text-3xl font-bold upperacase pb-2">
              DO YOU LIKE OUR HAIRDRESSER?
            </h2>
            <p className="mb-4 leading-10">
              Integer orci enim varius vel accumsan vel porttitor tellus.
              Vivamus odio. Donec metus libero semper quis suscipit ut aliquam
              metus. Phasellus ut lacus vel nisi donec molestie arcu quis neque
              Phasellus ut lacus vel nisi donec mole.
            </p>
            <Button className="rounded-none py-6 px-12 font-normal">
              BOOK NOW
            </Button>
          </div>
        </div>
        <div className="clear-both" />
      </Container>
    </main>
  );
}
