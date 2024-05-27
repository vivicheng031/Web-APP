// import { FaUserClock, FaUserTimes } from "react-icons/fa";
import { IoLogoSnapchat } from "react-icons/io";

// import { redirect } from "next/navigation";

// import { eq } from "drizzle-orm";

// import { db } from "@/db";
// import { subjectsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// import { getAddedFriends } from "./_components/action";

// async function ClassPage({} // searchParams,
// : {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }) {
async function ClassPage() {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  // const friends = await getAddedFriends(userId);
  // const newestFriendId = friends == null ? null : friends[0].userId;
  // if (newestFriendId) {
  //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social/${newestFriendId}`);
  // }

  // const [subject] = await db
  //   .select({ subject: subjectsTable.subject })
  //   .from(subjectsTable)
  //   .where(eq(subjectsTable.userId, userId ?? " "));

  // if (!subject) {
  //   redirect("/preference");
  // }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <IoLogoSnapchat size={180} className="text-[#8E6920]" />
        <p className="pt-6 text-center text-6xl font-semibold text-[#8E6920]">
          Choose a class.
        </p>
      </div>
    </div>
  );
}
export default ClassPage;
