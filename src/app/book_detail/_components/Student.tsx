import { AiFillDelete } from "react-icons/ai";

// import { revalidatePath } from "next/cache";
import Link from "next/link";

// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// import { deleteFriend } from "./action";

type ClassProps = {
  displayId: string;
  name: string;
};

export default async function Student({ displayId, name }: ClassProps) {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  return (
    <div className="group flex w-full cursor-pointer items-center justify-between hover:bg-yellow-100">
      <Link className="grow px-3 py-2" href={`/book/${displayId}`}>
        <div className="flex flex-col gap-2">
          <p className="flex gap-2 text-4xl font-semibold text-black">{name}</p>
        </div>
      </Link>
      <form
        className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex"
        // action={async () => {
        //   "use server";
        //   await deleteFriend(userId, displayId);
        //   revalidatePath("/social");
        //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social`);
        // }}
      >
        <button type="submit">
          <AiFillDelete size={36} />
        </button>
      </form>
    </div>
  );
}
