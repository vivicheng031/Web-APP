import Book from "./Book";
import { getBooks, getContent } from "./action";

async function BookList() {
  const books = await getBooks();

  return (
    <div className="flex h-full">
      <div className="relative m-4 flex w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <section className="flex w-full flex-col divide-y-4 divide-slate-400/25 overflow-y-auto pb-12">
          {books &&
            books.map(async (book) => {
              const content = await getContent(book.id);
              return (
                <Book
                  key={book.id}
                  displayId={book.id}
                  name={book.topic}
                  cover={content[0]?.image}
                  finish_date={book.finishDate.toISOString().split("T")[0]}
                />
              );
            })}
        </section>
      </div>
    </div>
  );
}

export default BookList;
