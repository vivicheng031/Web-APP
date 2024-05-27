// import { FaUserClock, FaUserTimes } from "react-icons/fa";
// import { IoLogoSnapchat } from "react-icons/io";
// import { redirect } from "next/navigation";
// import { eq } from "drizzle-orm";
// import { db } from "@/db";
// import { subjectsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";
// import { getAddedFriends } from "./_components/action";
import Book from "../_components/Book";

import AddDialog from "@/components/_components/AddDialog";

type Props = {
  params: { studentId: string };
};

async function BookPage(props: Props) {
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

  const books = [
    {
      id: 1,
      display_id: "abcdefg",
      topic: "one",
      finishDate: "2024/04/01(Mon.)",
      status: true,
    },
    {
      id: 2,
      display_id: "fgbnxgfnfx",
      topic: "two",
      finishDate: "2024/04/01(Mon.)",
      status: false,
    },
    {
      id: 3,
      display_id: "xngnxng",
      topic: "three",
      finishDate: "2024/04/01(Mon.)",
      status: true,
    },
    {
      id: 4,
      display_id: "xngngnxgfg",
      topic: "four",
      finishDate: "2024/04/01(Mon.)",
      status: false,
    },
    {
      id: 5,
      display_id: "xngfnfnnz",
      topic: "five",
      finishDate: "2024/04/01(Mon.)",
      status: true,
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="relative flex h-full w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <p className="p-2 text-6xl text-[#5C574D]">{props.params.studentId}</p>
        {/* change to name after we get API */}
        <section className="grid w-full grid-cols-2 gap-4 overflow-y-auto pb-12 md:hidden">
          {/* {classes &&
            classes.map(async (cls) => (
              <Class
                key={cls.id}
                displayId={cls.user.displayId}
                name={cls.user.username}
              />
          ))} */}
          {books.map((book) => (
            <Book
              key={book.id}
              displayId={book.display_id}
              topic={book.topic}
              finishDate={book.finishDate}
              email_status={book.status}
            />
          ))}
        </section>
        <section className="hidden w-full grid-cols-3 gap-4 overflow-y-auto pb-12 md:grid xl:hidden">
          {/* {classes &&
            classes.map(async (cls) => (
              <Class
                key={cls.id}
                displayId={cls.user.displayId}
                name={cls.user.username}
              />
          ))} */}
          {books.map((book) => (
            <Book
              key={book.id}
              displayId={book.display_id}
              topic={book.topic}
              finishDate={book.finishDate}
              email_status={book.status}
            />
          ))}
        </section>
        <section className="hidden w-full grid-cols-4 gap-4 overflow-y-auto pb-12 xl:grid 2xl:hidden">
          {/* {classes &&
            classes.map(async (cls) => (
              <Class
                key={cls.id}
                displayId={cls.user.displayId}
                name={cls.user.username}
              />
          ))} */}
          {books.map((book) => (
            <Book
              key={book.id}
              displayId={book.display_id}
              topic={book.topic}
              finishDate={book.finishDate}
              email_status={book.status}
            />
          ))}
        </section>
        <section className="hidden w-full grid-cols-5 gap-4 overflow-y-auto pb-12 2xl:grid">
          {/* {classes &&
            classes.map(async (cls) => (
              <Class
                key={cls.id}
                displayId={cls.user.displayId}
                name={cls.user.username}
              />
          ))} */}
          {books.map((book) => (
            <Book
              key={book.id}
              displayId={book.display_id}
              topic={book.topic}
              finishDate={book.finishDate}
              email_status={book.status}
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
export default BookPage;
