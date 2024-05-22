import { FaRegPaperPlane } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

// import { revalidatePath } from "next/cache";
import Link from "next/link";

// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// import { deleteFriend } from "./action";

type BookProps = {
  displayId: string;
  topic: string;
  finishDate: string;
  email_status: boolean;
};

export default async function Book({
  displayId,
  topic,
  finishDate,
  email_status,
}: BookProps) {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  return (
    <div className="group my-4 flex w-full items-center">
      <Link
        className="relative aspect-[1/1] w-full rounded-2xl bg-white p-4"
        href={`/book_detail/${displayId}`}
      >
        <div className="relative aspect-[3/2] bg-purple-200"></div>
        <p className="col-span-3 m-2 flex self-center text-6xl font-semibold text-black">
          {topic}
        </p>
        <p className="col-span-2 m-2 flex self-center whitespace-normal break-words text-2xl text-black">
          {finishDate}
        </p>
        {email_status ? (
          // sent
          <div className="absolute bottom-12 right-6 flex h-1/6 w-1/6 items-center justify-center rounded-full bg-[#B7E3AC] text-[#3B6341]">
            <FaCheck className="text-[32px] 2xl:text-[40px]" />
          </div>
        ) : (
          // unsend
          <div className="absolute bottom-12 right-6 flex h-1/6 w-1/6 items-center justify-center rounded-full bg-[#D9D9D9] text-[#373737]">
            <FaRegPaperPlane className="text-[32px] 2xl:text-[40px]" />
          </div>
        )}
      </Link>
    </div>
  );
}
