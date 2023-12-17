import Slider from "./_components/Slider";
import SlideItem from "./_components/SlideItem";
import Image from "next/image";
import SlideItemHeading from "./_components/sliderItemElements/SlideItemHeading";
import SlideItemParagraph from "./_components/sliderItemElements/SlideItemParagraph";
import SlideItemText from "./_components/sliderItemElements/SlideItemText";
import SlideItemLinkButton from "./_components/sliderItemElements/SlideItemLinkButton";

const sliderData = [
  {
    position: "left",
    image: "/images/slider/slider_01.jpg",
    align: "left",
    components: [
      <Image
        key={0}
        alt="Slide image 1"
        width={152}
        height={211}
        src="/images/slider_logo_01.png"
      />,
      <SlideItemHeading key={1}>
        Best Barber & hair shop Template for ever!
      </SlideItemHeading>,
      <SlideItemParagraph key={2}>
        We care about your beauty, We offer you the best service! Get an
        appointment now and meet us!
      </SlideItemParagraph>,
    ],
  },
  {
    position: "left",
    image: "/images/slider/slider_02.jpg",
    align: "left",
    components: [
      <Image
        key={0}
        alt="Slider Image 02"
        src="/images/slider_logo_02.png"
        width={106}
        height={129}
      />,
      <SlideItemHeading key={1}>
        Achieve a style of your dreams! Just imagine
      </SlideItemHeading>,
      <SlideItemLinkButton key={2} href="/book-now">
        Book now
      </SlideItemLinkButton>,
    ],
  },
  {
    position: "center",
    image: "/images/slider/slider_03.jpg",
    align: "center",
    components: [
      <SlideItemText key={0}>Since 1989</SlideItemText>,
      <Image
        key={1}
        src="/images/slider_logo_03.png"
        alt="Slider logo 03"
        width={118}
        height={29}
      />,
      <SlideItemHeading key={2}>Barberia</SlideItemHeading>,
      <SlideItemParagraph key={3}>
        Most popular, creative, super responsive, retina ready hight-quality
        HTML5 barber site template!
      </SlideItemParagraph>,
    ],
  },
];

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
    </main>
  );
}
