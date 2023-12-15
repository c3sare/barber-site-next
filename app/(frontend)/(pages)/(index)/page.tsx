import Slider from "./_components/Slider";
import SlideItem from "./_components/SlideItem";

const sliderData = [
  {
    title: "Best Barber & hair shop template for ever!",
    position: "left",
    image: "/images/slider/slider_01.jpg",
  },
  {
    title: "Barberia",
    position: "left",
    image: "/images/slider/slider_02.jpg",
  },
  {
    title: "Achieve a style of your dreams! Just imagine",
    position: "center",
    image: "/images/slider/slider_03.jpg",
  },
];

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <Slider>
        {sliderData.map((item, i) => (
          <SlideItem key={i} index={i} backgroundUrl={item.image}>
            <h1 className="text-7xl text-white font-bold">Test</h1>
            <h2 className="text-7xl text-white font-bold">test2</h2>
            <h3 className="text-7xl text-white font-bold">test3</h3>
          </SlideItem>
        ))}
      </Slider>
    </main>
  );
}
