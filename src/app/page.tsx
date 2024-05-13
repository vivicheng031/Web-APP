import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello world ! This is the home page
      <Link
        href="/painting"
        className="border-bdr bg-btn text-txt hover:bg-description/80 m-2 rounded-2xl border-4 px-4 py-2 text-center text-3xl"
      >
        Start Painting
      </Link>
    </main>
  );
}
