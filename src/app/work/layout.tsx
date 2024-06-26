import Image from "next/image";
import Link from "next/link";

import BookList from "./_components/BookList";

type Props = {
  children: React.ReactNode;
};

async function Work({ children }: Props) {
  return (
    <main className="flex h-screen w-full flex-col justify-center overflow-y-scroll md:overflow-hidden">
      <div className="h-1/6 w-full bg-[#FCEFCD]">
        <div className="flex h-full items-center gap-0 px-5 text-[#F9A100] sm:gap-2">
          <Link href="/" className="flex h-full items-center">
            <div className="md:h-45 flex aspect-[1/1] h-40 items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                className="h-full w-full"
                width={100}
                height={100}
              />
            </div>
          </Link>
          <div className="grow"></div>
          <div className="flex flex-col md:flex-row">
            <Link
              className="rounded-2xl px-4 py-2 text-3xl transition-colors hover:bg-[#FFDB99] md:text-4xl lg:text-5xl xl:text-6xl"
              href={{
                pathname: `/painting`,
              }}
            >
              Painting
            </Link>
            <Link
              className="rounded-2xl px-4 py-2 text-3xl transition-colors hover:bg-[#FFDB99] md:text-4xl lg:text-5xl xl:text-6xl"
              href={{
                pathname: `/work`,
              }}
            >
              Works
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-rows h-5/6 w-full bg-[#D1C3B9] xl:flex">
        <nav className="bg-nav h-[280px] min-w-min flex-col justify-start overflow-y-auto border-r xl:my-0 xl:h-full xl:w-1/4">
          <BookList />
        </nav>
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="md:mt-30 w-full overflow-y-auto xl:mt-0 xl:w-3/4">
          {children}
        </div>
      </div>
    </main>
  );
}

export default Work;
