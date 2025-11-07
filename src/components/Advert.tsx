import Image from "next/image";

export default function Advert() {
  return (
    <section className="wrapper advert-section">
      <div className="flex flex-col justify-between items-center lg:flex-row-reverse lg:items-center bg-light-grey px-6 rounded-lg gap-14 md:gap-0 mb-[120px] lg:mb-0">
        <div>
          <Image
            src="/advert-img.png"
            alt="Best Gear"
            className="advert-img rounded-lg max-w-[327px] h-[227px] md:w-[689px] md:h-[300px] lg:max-w-[540px] lg:h-[400px]"
            width={600}
            height={600}
          />
        </div>

        <div className="advert text-center max-w-[550px] lg:max-w-[573px] lg:min-w-[300px] flex flex-col gap-6 lg:px-0 lg:text-left md:pt-6 md:px-4">
          <h2 className="">
            Bringing you the <span>best</span> audio gear
          </h2>
          <p>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
}
