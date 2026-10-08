import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const today = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date());

  return (
    <section className="bg-[#f2f4f0] px-4 py-8 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 rounded-3xl bg-[#ffffff] px-6 py-8 md:flex-row md:px-10 md:py-10">

        {/* Left Side */}
        <div className="w-full md:w-1/2">

          {/* Date */}
          <div className="mb-4 inline-block rounded-full bg-[#dcefdc] px-4 py-2 text-xs font-medium text-green-700">
           {today}
           </div>

          {/* Heading */}
          <h2 className="whitespace-nowrap text-1xl font-bold leading-tight text-gray-900 md:text-5xl">
            Today&apos;s Market Prices at a Glance
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 md:text-base">
            Check the latest prices of rice, dal, oil, vegetables, fish, meat,
            eggs, milk and spices. Compare market prices, average prices,
            minimum and maximum prices and daily price changes in one place.
          </p>

          {/* Button */}
          <Link
            href="#all-products"
            className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            View All Products
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex w-full justify-center md:w-1/2 md:translate-x-24">
          <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">

            <Image
              src="/bazar-hero.png"
              alt="Fruit basket"
              width={320}
              height={320}
              className="h-auto w-full object-contain"
            />

          </div>
        </div>

      </div>
    </section>
  );
}