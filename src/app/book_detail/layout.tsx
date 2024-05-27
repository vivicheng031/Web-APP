import Image from "next/image";
import Link from "next/link";

import SignOutButton from "@/components/_components/SignOutButton";

import StudentList from "./_components/StudentList";

type Props = {
  children: React.ReactNode;
};

const class_name = "AAA";

async function Book({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex h-screen w-full flex-col justify-center overflow-y-auto bg-[#FCEFCD]">
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="flex h-1/6 w-full flex-row items-center pr-4 text-[#F9A100]">
        <Link href="/home" className="flex h-full items-center">
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
        <SignOutButton />
      </div>
      <div className="flex-rows h-5/6 xl:flex">
        <nav className="bg-nav h-[280px] min-w-min flex-col justify-start overflow-y-auto border-r xl:my-0 xl:h-full xl:w-1/4">
          <StudentList cls={class_name} />
        </nav>
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="overflow-y-auto xl:w-3/4">{children}</div>
      </div>
    </main>
  );
}

export default Book;
