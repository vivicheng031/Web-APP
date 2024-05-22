// import { FaUserClock, FaUserTimes } from "react-icons/fa";
// import { IoLogoSnapchat } from "react-icons/io";
// import { redirect } from "next/navigation";
// import { eq } from "drizzle-orm";
// import { db } from "@/db";
// import { subjectsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";
// import { getAddedFriends } from "./_components/action";
import Task from "../_components/Task";

import AddDialog from "@/components/_components/AddDialog";

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

  const tasks = [
    {
      id: 1,
      display_id: "abcdefg",
      topic: "one",
      startDate: "2024/04/01(Mon.)",
      endDate: "2024/04/09(Mon.)",
    },
    {
      id: 2,
      display_id: "fgbnxgfnfx",
      topic: "two",
      startDate: "2024/04/01(Mon.)",
      endDate: "2024/04/09(Mon.)",
    },
    {
      id: 3,
      display_id: "xngnxng",
      topic: "three",
      startDate: "2024/04/01(Mon.)",
      endDate: "2024/04/09(Mon.)",
    },
    {
      id: 4,
      display_id: "xngngnxgfg",
      topic: "four",
      startDate: "2024/04/01(Mon.)",
      endDate: "2024/04/09(Mon.)",
    },
    {
      id: 5,
      display_id: "xngfnfnnz",
      topic: "five",
      startDate: "2024/04/01(Mon.)",
      endDate: "2024/04/09(Mon.)",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="relative flex h-full w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <p className="p-2 text-6xl text-[#5C574D]">Task History</p>
        <section className="flex w-full flex-col divide-y-8 divide-transparent overflow-y-auto pb-12">
          {/* {classes &&
            classes.map(async (cls) => (
              <Class
                key={cls.id}
                displayId={cls.user.displayId}
                name={cls.user.username}
              />
          ))} */}
          {tasks.map((task) => (
            <Task
              key={task.id}
              displayId={task.display_id}
              topic={task.topic}
              startDate={task.startDate}
              endDate={task.endDate}
            />
          ))}
        </section>
        <div className="absolute bottom-1 right-1">
          <AddDialog />
        </div>
      </div>
    </div>
  );
}
export default ClassPage;
