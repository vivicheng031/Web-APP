import localFont from "next/font/local";
// import Image from "next/image";
import Link from "next/link";

const pattaya = localFont({
  src: "./fonts/Poetsen-One.woff2",
  weight: "700",
  style: "italic",
});

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       Hello world ! This is the home page
//       <Link
//         href="/painting"
//         className={`${pattaya.className} text-txt mb-4 text-center text-5xl`}
//       >
//         Start Painting
//       </Link>
//     </main>
//   );
// }

import * as React from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="flex justify-center items-center px-16 py-20 bg-amber-100 max-md:px-5">
      <div className="mt-20 w-full max-w-[1332px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto text-center max-md:mt-10 max-md:max-w-full">
              <h1 className="text-5xl text-orange-400 max-md:max-w-full max-md:text-4xl">
                {title}
                <br />
                <span className="text-3xl">{subtitle}</span>
              </h1>
              <button className="justify-center self-center px-16 py-5 mt-16 text-7xl text-amber-900 whitespace-nowrap bg-orange-200 rounded-3xl border-amber-900 border-solid border-[5px] max-md:pr-6 max-md:pl-6 max-md:mt-10 max-md:text-4xl">
                {buttonText}
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={imageSrc}
              alt={imageAlt}
              className="w-full aspect-square max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <main>
      <HeroSection
        title="Welcome to the Whole New World"
        subtitle="for you and me"
        buttonText="start"
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e9e0562be2beb3842d3e45c83fff9e4df834ae3feae8acf90e1396ce2bc12053?apiKey=1661ea4d66254cafac7fd5965b2f5a8a&"
        imageAlt="Hero image"
      />
    </main>
  );
}

export default App;