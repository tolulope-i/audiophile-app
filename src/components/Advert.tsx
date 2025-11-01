import Image from "next/image";

export default function Advert() {
  return (
    <section className="wrapper">
      <div className="flex flex-col justify-between items-center md:flex-row-reverse lg:items-center bg-light-grey px-6 py-16 rounded-lg md:py-20 lg:py-24 gap-12 md:gap-0">
        
        <div>
          <Image
            src="/advert-img.png"
            alt="Best Gear"
            className="advert-img rounded-lg"
            width={600}
            height={600}
          />
        </div>

        <div className="advert text-center max-w-[445px] lg:max-w-[573px] px-8 flex flex-col gap-6 lg:px-0 lg:text-left">
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
