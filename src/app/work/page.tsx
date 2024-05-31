import { IoLogoSnapchat } from "react-icons/io";

async function BookDetailPage() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <IoLogoSnapchat size={180} className="text-[#8E6920]" />
        <p className="pt-6 text-center text-6xl font-semibold text-[#8E6920]">
          Choose a book.
        </p>
      </div>
    </div>
  );
}
export default BookDetailPage;
