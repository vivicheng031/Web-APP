import * as React from "react";

import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const roadrage = localFont({
  src: "./fonts/RoadRage-Regular.ttf",
  weight: "700",
  style: "italic",
});

function Home() {
  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center bg-[#FCEFCD]">
      <div className="m-4 flex h-full w-full flex-wrap items-center justify-center gap-20 p-8">
        <div className="mx-4 flex flex-col items-center gap-4 lg:w-2/5">
          <div className="my-auto flex flex-col self-stretch text-center max-md:max-w-full">
            <h1
              className={`${roadrage.className} text-txt mb-4 text-center text-9xl text-[#D88253]`}
            >
              Welcome to
              <br />
              the Whole New World
              <br />
              <div className="text-8xl">for you and me</div>
            </h1>
            <Link
              href="/painting"
              className={`${roadrage.className} mt-16 justify-center self-center whitespace-nowrap rounded-3xl border-[5px] border-solid border-amber-900 bg-orange-200 px-16 py-5 text-7xl text-amber-900 max-md:mt-10 max-md:pl-6 max-md:pr-6 max-md:text-4xl`}
            >
              START
            </Link>
          </div>
        </div>
        <Image
          src="/home_page_picture.png"
          alt="Hero image"
          className="mb-4 w-full lg:mb-0 lg:mr-4 lg:w-2/5"
          width={3000}
          height={3000}
        />
      </div>
    </main>
  );
}

export default Home;
