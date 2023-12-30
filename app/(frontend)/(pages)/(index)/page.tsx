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
import { barbersData } from "./_data/barbersData";
import { testimonialsData } from "./_data/testimonialsData";
import { blogData } from "./_data/blogData";
import { shopData } from "./_data/shopData";
import { CommentCarousel } from "./_components/CommentCarousel";
import { Pros } from "./_components/pros";
import { ProItem } from "./_components/pros/ProItem";
import { WorksContainer } from "./_components/works";
import { WorkItem } from "./_components/works/WorkItem";
import { AboutImage } from "./_components/AboutImage";
import { ExperienceBar } from "./_components/ExperienceBar";
import ServiceBox from "./_components/services/ServiceBox";
import OpenHourItem from "./_components/OpenHoursItem";
import BarberBox from "./_components/barbers/BarberBox";
import TestimonialItem from "./_components/testimonials/TestimonialItem";
import BlogPost from "./_components/blog/BlogPost";
import ContactBox from "./_components/contact/ContactBox";
import ProductItem from "./_components/products/ProductItem";
import Heading from "./_components/Heading";
import LightboxImageItem from "@/components/LightboxImageItem";
import { Gallery } from "@/components/lightbox";

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
        <div className="p-5 my-8 w-full flex-1 md:flex-auto md:w-2/3 float-left bg-white shadow-[0_3px_0_#f0f1f3]">
          <h4>Welcome to the Barberia</h4>
          <p className="italic pb-1 leading-8 relative w-auto text-base mb-5">
            The Barberia opened in the fall of 1989. We specialize in cutting
            mens hair and shaving their faces. Let{"'"}s see all our awesome
            features below! Thanks for choose us!
          </p>
          <p className="pb-1 mb-3">
            Lorem Ipsum, you need to be sure there isn{"'"}t anything emb. All
            the Lorem Ipsum on the Internet tend to repeat predefined chunks as
            necessary, making this the first true generator on the Internet.
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
      </Container>
      <Container className="py-4">
        <WorksContainer title="Beard & Hair styles">
          <Gallery withCaption>
            {stylesData.map((src, i) => (
              <LightboxImageItem key={i} src={src} i={i} />
            ))}
          </Gallery>
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
        <Heading image="/images/dark-hr.png" className="text-black">
          Our Services
        </Heading>
        <div className="w-full">
          {servicesData.map((service, i) => (
            <ServiceBox key={i} {...service} />
          ))}
          <div className="clear-both" />
        </div>
      </Container>
      <Container
        bgImageUrl="/images/parallax/parallax_01.jpg"
        parallax
        className="py-24"
      >
        <Heading image="/images/white-hr.png">Our opening hours</Heading>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {openData.map((item) => (
            <OpenHourItem key={item.day} {...item} />
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
        <Heading image="/images/dark-hr-2.png" className="text-black">
          LICENSED BARBERS
        </Heading>
        <div>
          {barbersData.map((item) => (
            <BarberBox key={item.id} {...item} />
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
          <Heading>Happy Testimonials</Heading>
          <CommentCarousel>
            {testimonialsData.map((item) => (
              <TestimonialItem key={item.id} {...item} />
            ))}
          </CommentCarousel>
        </div>
      </Container>
      <Container wrapperClassName="bg-zinc-100" className="py-24">
        <Heading image="/images/dark-hr-2.png" className="text-black">
          FROM THE BLOG
        </Heading>
        <div className="w-full">
          {blogData.map((post) => (
            <BlogPost key={post.id} {...post} />
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
        <ContactBox>support@barberia.com</ContactBox>
        <ContactBox variant="big">+90 1234-567-890</ContactBox>
        <ContactBox>Envato inc 22 Elizabeth str. melbourne.</ContactBox>
        <ContactBox>victoria 8777. Australia</ContactBox>
      </Container>
      <Container className="py-24" wrapperClassName="bg-[#f7f8fa]">
        <Heading image="/images/dark-hr-3.png" className="text-black">
          FROM THE SHOP
        </Heading>
        <div className="w-full mb-6">
          {shopData.map((product) => (
            <ProductItem key={product.id} {...product} />
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
