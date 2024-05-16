import * as React from "react";

import localFont from "next/font/local";
import Link from "next/link";

// import Image from "next/image";

// const pattaya = localFont({
//   src: "./fonts/Poetsen-One.woff2",
//   weight: "700",
//   style: "italic",
// });

const roadrage = localFont({
  src: "./fonts/RoadRage-Regular.ttf",
  weight: "700",
  style: "italic",
});

interface HeroSectionProps {
  title1: string;
  title2: string;
  subtitle: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  buttonLink: string;
}

const backgroundColor = "#FCEFCD";
const textColor = "#D88253";

const HeroSection: React.FC<HeroSectionProps> = ({
  title1,
  title2,
  subtitle,
  buttonText,
  imageSrc,
  imageAlt,
  buttonLink,
}) => {
  return (
    <section className="flex items-center justify-center px-20 py-20 max-md:px-5">
      <div className="mt-20 w-full max-md:mt-20 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <div className="my-auto flex flex-col self-stretch text-center max-md:max-w-full">
              <h1
                className={`${roadrage.className} text-txt mb-4 text-center text-9xl`}
                style={{ color: textColor }}
              >
                {title1}
                <br />
                {title2}
                <br />
                <div className="text-8xl">{subtitle}</div>
              </h1>
              <Link
                href={buttonLink}
                className={`${roadrage.className} mt-16 justify-center self-center whitespace-nowrap rounded-3xl border-[5px] border-solid border-amber-900 bg-orange-200 px-16 py-5 text-7xl text-amber-900 max-md:mt-10 max-md:pl-6 max-md:pr-6 max-md:text-4xl`}
              >
                {buttonText}
              </Link>
            </div>
          </div>
          <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={imageSrc}
              alt={imageAlt}
              className="aspect-square w-full max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
function App() {
  return (
    <main className="flex h-full w-full flex-col" style={{ backgroundColor }}>
      <HeroSection
        title1="Welcome to"
        title2="the Whole New World"
        subtitle="for you and me"
        buttonText="start"
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e9e0562be2beb3842d3e45c83fff9e4df834ae3feae8acf90e1396ce2bc12053?apiKey=1661ea4d66254cafac7fd5965b2f5a8a&"
        imageAlt="Hero image"
        buttonLink="/painting"
      />
    </main>
  );
}

export default App;
