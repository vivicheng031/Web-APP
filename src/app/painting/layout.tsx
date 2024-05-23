// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";
import Image from "next/image";
import Link from "next/link";

import SignOutButton from "@/components/_components/SignOutButton";

type Props = {
  children: React.ReactNode;
};

async function Painting({ children }: Props) {
  // const session = await auth();
  // if (!session) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }

  return (
    <main className="flex h-screen w-full flex-col justify-center overflow-y-scroll md:overflow-hidden">
      <div className="h-1/6 w-full bg-[#FCEFCD]">
        <div className="flex h-full items-center gap-0 px-5 text-[#F9A100] sm:gap-2">
          <Link href="/painting" className="flex h-full items-center">
            <div className="md:h-45 md:w-45 h-40 w-40">
              <Image
                src="/logo.png"
                alt="Logo"
                className="mr-20 h-full w-full"
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
                pathname: `/works`,
              }}
            >
              Works
            </Link>
          </div>
          <SignOutButton />
        </div>
      </div>

      <div className="flex-rows bg-brand_2 h-5/6 w-full md:flex">
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="md:mt-30 w-full overflow-y-auto lg:mt-0">
          {children}
        </div>
      </div>
    </main>
  );
}

export default Painting;
