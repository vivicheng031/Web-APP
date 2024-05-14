import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const pattaya = localFont({
  src: "./fonts/Poetsen-One.woff2",
  weight: "700",
  style: "italic",
});


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello world ! This is the home page
      <Link
        href="/painting"
        className={`${pattaya.className} mb-4 text-center text-5xl text-txt`}
      >
        Start Painting
      </Link>
    </main>
  );
}
