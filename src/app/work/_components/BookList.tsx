// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";
import Book from "./Book";

// import { getAddedFriends } from "./action";

// type PageProps = {
//   searchParams: {
//     search?: string;
//   };
// };

async function BookList() {
  // const session = await auth();
  // console.log(session?.user);
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;
  // const friends = await getAddedFriends(userId);

  const books = [
    {
      id: 1,
      display_id: "abcdefg",
      book_name: "AAA",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 2,
      display_id: "fgbnxgfnfx",
      book_name: "BBB",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 3,
      display_id: "xngnxng",
      book_name: "CCC",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 4,
      display_id: "xngngnxgfg",
      book_name: "DDD",
      finishDate: "2024/04/01(Mon.)",
    },
    {
      id: 5,
      display_id: "xngfnfnnz",
      book_name: "EEE",
      finishDate: "2024/04/01(Mon.)",
    },
  ];

  return (
    <div className="flex h-full">
      <div className="relative m-4 flex w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <section className="flex w-full flex-col divide-y-4 divide-slate-400/25 overflow-y-auto pb-12">
          {books.map((book) => (
            <Book
              key={book.id}
              displayId={book.display_id}
              name={book.book_name}
              finish_date={book.finishDate}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default BookList;
