import { FaRegPaperPlane } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import BookArea from "../_components/BookArea";

// import { redirect } from "next/navigation";
// import { eq } from "drizzle-orm";
// import { db } from "@/db";
// import { subjectsTable } from "@/db/schema";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";
// import { getAddedFriends } from "./_components/action";

type Props = {
  params: { bookId: string };
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

  const book_detail = {
    topic: "test",
    finishDate: "2024/04/01(Mon.)",
    status: false,
    student: "web-app",
  };

  const pages = [
    {
      id: 1,
      display_id: "abcdefg",
      description: "cover",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 2,
      display_id: "fgbnxgfnfx",
      description:
        "page 1 vdlmiguncz bhlmzo g dghnz,lvme hgik sn mknumci grnuemrs.log ligm jvlo.tim.lorn ugilry yfd.o nugoi uj.oti.r rofysji mgyrs",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 3,
      display_id: "xngnxng",
      description: "page 2",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 4,
      display_id: "xngngnxgfg",
      description: "page 3",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 5,
      display_id: "xngfnfnnz",
      description: "page 4",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 11,
      display_id: "abcdefg",
      description: "page 5",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 22,
      display_id: "fgbnxgfnfx",
      description: "page 6",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 33,
      display_id: "xngnxng",
      description: "page 7",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 44,
      display_id: "xngngnxgfg",
      description: "page 8",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 55,
      display_id: "xngfnfnnz",
      description: "page 9",
      finishDate: "2024/04/01(Mon.)",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex h-full w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <div className="flex h-1/6 w-full items-center justify-center pr-4 lg:justify-between flex-row">
          <p className="p-2 text-5xl text-[#3A3731] xl:text-6xl">
            {props.params.bookId}
          </p>
          {/* change to name after we get API */}
          <p className="p-2 text-3xl text-[#5C574D] xl:text-4xl">
            {book_detail.finishDate}
          </p>
          {book_detail.status ? (
            // sent
            <div className="flex aspect-[1/1] h-[60px] md:h-[75px] 2xl:h-[90px] items-center justify-center rounded-full bg-[#B7E3AC] text-[#3B6341]">
              <FaCheck className="text-[30px] md:text-[45px] 2xl:text-[60px]" />
            </div>
          ) : (
            // unsend
            <button className="flex aspect-[1/1] h-[60px] md:h-[75px] 2xl:h-[90px] items-center justify-center rounded-full bg-[#D9D9D9] text-[#373737]">
              <FaRegPaperPlane className="text-[30px] md:text-[45px] 2xl:text-[60px]" />
            </button>
          )}
        </div>

        <div className="book h-full w-full pt-2">
          <BookArea book={pages} />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
