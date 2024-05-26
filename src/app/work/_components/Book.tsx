// import { revalidatePath } from "next/cache";
import Link from "next/link";

// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// import { deleteFriend } from "./action";

type BookProps = {
  displayId: string;
  name: string;
  finish_date: string;
};

export default async function Book({
  displayId,
  name,
  finish_date,
}: BookProps) {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  return (
    <div className="group flex w-full cursor-pointer items-center justify-between hover:bg-yellow-100">
      <Link className="grow px-3 py-2" href={`/work/${displayId}`}>
        <div className="flex flex-row gap-4">
          <div className="mb-2 aspect-[3/2] w-1/3 bg-purple-200"></div>
          <div className="flex flex-col">
            <p className="flex gap-2 text-4xl font-semibold text-[#3A3731]">
              {name}
            </p>
            <p className="flex gap-2 text-3xl font-semibold text-[#5C574D]">
              {finish_date}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
