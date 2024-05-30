import { FaRegPaperPlane } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

import { revalidatePath } from "next/cache";

import BookArea from "../_components/BookArea";
import { sendEmail, getBook, getContent } from "../_components/action";

type Props = {
  params: { bookId: string };
};

async function BookPage(props: Props) {
  const bookId = props.params.bookId;
  const book_detail = await getBook(bookId);
  const content = await getContent(bookId);

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex h-full w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <div className="flex h-1/6 w-full flex-row items-center justify-center pr-4 lg:justify-between">
          <p className="p-2 text-5xl text-[#3A3731] xl:text-6xl">
            {book_detail.topic}
          </p>
          <p className="p-2 text-3xl text-[#5C574D] xl:text-4xl">
            {book_detail.finishDate.toISOString().split("T")[0]}
          </p>
          {book_detail.emailStatus ? (
            // sent
            <div className="flex aspect-[1/1] h-[60px] items-center justify-center rounded-full bg-[#B7E3AC] text-[#3B6341] md:h-[75px] 2xl:h-[90px]">
              <FaCheck className="text-[30px] md:text-[45px] 2xl:text-[60px]" />
            </div>
          ) : (
            // unsend
            <form
              action={async () => {
                "use server";
                // console.log(typeof(bookId));
                await sendEmail(bookId);
                revalidatePath(`/work/${bookId}`);
              }}
            >
              <button
                className="flex aspect-[1/1] h-[60px] items-center justify-center rounded-full bg-[#D9D9D9] text-[#373737] md:h-[75px] 2xl:h-[90px]"
                type={"submit"}
              >
                <FaRegPaperPlane className="text-[30px] md:text-[45px] 2xl:text-[60px]" />
              </button>
            </form>
          )}
        </div>

        <div className="book h-full w-full pt-2">
          <BookArea book={content} />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
