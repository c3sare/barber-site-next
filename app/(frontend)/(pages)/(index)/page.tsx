import Slider from "./_components/Slider";
import SlideItem from "./_components/SlideItem";
import { sliderData } from "./_data/sliderData";
import Container from "@/components/container";
import Image from "next/image";
import { prosData } from "./_data/prosData";
import AppoitnmentForm from "./_components/AppoitmentForm";

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
            <div className="w-full flex">
              {prosData.map((pro, i) => (
                <div key={i} className="w-1/3">
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
    </main>
  );
}
