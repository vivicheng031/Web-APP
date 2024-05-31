import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poetsenOne = localFont({
  src: "./fonts/Poetsen-One.woff2",
  weight: "700",
  style: "normal",
});

export const metadata: Metadata = {
  title: "New World",
  description: "A new world to create your own picture book.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poetsenOne.className}`}>
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
