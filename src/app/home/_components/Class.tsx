// import { revalidatePath } from "next/cache";
import Link from "next/link";

// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// import { deleteFriend } from "./action";

type ClassProps = {
  displayId: string;
  name: string;
  topic: string;
};

export default async function Class({ displayId, name, topic }: ClassProps) {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  return (
    <div className="group flex w-full cursor-pointer items-center justify-between hover:bg-yellow-100">
      <Link className="grow px-3 py-1" href={`./class/${displayId}`}>
        <div className="flex flex-col gap-2">
          <p className="flex gap-2 text-4xl font-semibold text-black">{name}</p>
          <p className="flex gap-2 whitespace-normal break-words text-3xl text-black">
            {topic}
          </p>
        </div>
      </Link>
    </div>
  );
}
