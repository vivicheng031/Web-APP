"use client";

import { useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import { IoChevronForwardCircle } from "react-icons/io5";

// import { revalidatePath } from "next/cache";

// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

type Page = {
  id: number;
  display_id: string;
  // picture: string;
  description: string;
  finishDate: string;
};

type BookProps = {
  book: Page[];
};

export default function BookArea({ book }: BookProps) {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  const total_page = book.length;

  const [page, setPage] = useState(1);

  const previousPage = () => {
    setPage((prev) => prev - 2);
  };

  const nextPage = () => {
    setPage((prev) => prev + 2);
  };

  return (
    <div className="flex h-full items-center gap-4 overflow-y-auto">
      <button
        onClick={previousPage}
        disabled={page == 1}
        className={`text-[64px] text-[#A8450F] ${
          page == 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <IoChevronBackCircle />
      </button>
      <div className="flex h-full grow flex-row gap-2 rounded-xl bg-white">
        <div className="h-max-full m-4 flex w-1/2 flex-col gap-3">
          <div className="flex h-2/3 justify-center">
            <div className="aspect-[3/2] w-full bg-purple-200 lg:h-full"></div>
          </div>
          <div className="flex h-1/3 flex-col justify-between">
            <p className="whitespace-pre-line break-words text-3xl">
              {book[page].description}
            </p>
            <div className="flex w-full flex-row justify-between">
              <p className="text-2xl text-gray-500">{book[page].finishDate}</p>
              <p className="text-2xl">page {page}</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-400"></div>
        <div className="h-max-full m-4 flex w-1/2 flex-col gap-3">
          {page + 1 != total_page && (
            <>
              <div className="flex h-2/3 justify-center">
                <div className="aspect-[3/2] w-full bg-purple-200 lg:h-full"></div>
              </div>
              <div className="flex h-1/3 flex-col justify-between">
                <p className="whitespace-pre-line break-words text-3xl">
                  {book[page + 1].description}
                </p>
                <div className="flex w-full flex-row justify-between">
                  <p className="text-2xl text-gray-500">
                    {book[page + 1].finishDate}
                  </p>
                  <p className="text-2xl">page {page + 1}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button
        onClick={nextPage}
        disabled={page >= total_page - 2}
        className={`text-[60px] ${
          page >= total_page - 2
            ? "cursor-not-allowed text-[#A76A48]"
            : "text-[#A8450F]"
        }`}
      >
        <IoChevronForwardCircle />
      </button>
    </div>
  );
}
