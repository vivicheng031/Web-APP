import Image from "next/image";
import Link from "next/link";

type BookProps = {
  displayId: string;
  name: string;
  cover: string | undefined;
  finish_date: string;
};

export default async function Book({
  displayId,
  name,
  cover,
  finish_date,
}: BookProps) {
  return (
    <div className="group flex w-full cursor-pointer items-center justify-between hover:bg-yellow-100">
      <Link className="mb-1 grow px-3 py-2" href={`/work/${displayId}`}>
        <div className="flex flex-row gap-4">
          <div className="aspect-[3/2] w-1/4 rounded-2xl bg-gray-200">
            {cover && (
              <Image
                src={cover}
                alt="Logo"
                width={1000}
                height={1000}
                className="flex items-center justify-center rounded-2xl"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex text-5xl font-semibold text-[#3A3731] xl:text-4xl">
              {name}
            </p>
            <p className="flex text-3xl font-semibold text-[#5C574D] xl:text-2xl">
              {finish_date}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
