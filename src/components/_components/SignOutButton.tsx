"use client";

import { FaSignOutAlt } from "react-icons/fa";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { publicEnv } from "@/lib/env/public";

export default function SignOutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const SignOut = () => {
    if (session) {
      signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
    }
    router.push("/");
  };

  return (
    <button
      data-testid="sign-out-button"
      className="flex items-center rounded-full px-4 py-2 text-5xl transition-colors hover:bg-[#FFDB99] xl:text-6xl"
      onClick={SignOut}
    >
      <FaSignOutAlt />
    </button>
  );
}
