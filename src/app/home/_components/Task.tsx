// import { revalidatePath } from "next/cache";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

type TaskProps = {
  displayId: string;
  topic: string;
  cls: string;
  startDate: string;
  endDate: string;
};

export default async function Task({
  // displayId,
  topic,
  cls,
  startDate,
  endDate,
}: TaskProps) {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  return (
    <div className="group my-4 flex w-full items-center">
      <div className="mx-2 grid w-full grid-cols-5">
        <p className="col-span-2 flex self-center text-5xl font-semibold text-black">
          {topic}
        </p>
        <p className="flex self-center whitespace-normal break-words text-3xl text-black">
          {cls}
        </p>
        <p className="col-span-2 flex self-center whitespace-normal break-words text-3xl text-black">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
}
