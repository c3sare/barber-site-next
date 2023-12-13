import Image from "next/image";

const sliderData = [
  {
    title: "Best Barber & hair shop template for ever!",
    position: "left",
    image: "/images/slider/slider_01.jpg",
  },
  {
    title: "",
    position: "left",
    image: "/images/slider/slider_02.jpg",
  },
  {
    title: "",
    position: "center",
    image: "/images/slider/slider_03.jpg",
  },
];

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <div className="h-[80vh] w-full overflow-hidden">
        <div>
          {sliderData.map((item) => (
            <div
              key={item.image}
              className="w-full h-[80vh] overflow-hidden relative"
            >
              <Image
                alt="Slide"
                src={item.image}
                fill
                sizes="100vw"
                className="object-cover object-right"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
