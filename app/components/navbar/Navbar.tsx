"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  return (
    <nav className="w-full h-16 bg-white shadow-md px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/">
          <span className="text-xl font-bold text-blue-500">🐾 PetCare AI</span>
        </Link>
        <Link
          href="/pets"
          className="ml-6 text-gray-700 hover:text-blue-600 font-medium"
        >
          My Pets
        </Link>
        <Link
          href="/"
          className="ml-4 text-gray-700 hover:text-blue-600 font-medium"
        >
          Chat
        </Link>
      </div>
      <Button
        intent="outline"
        size="sm"
        onClick={async () => {
          await signOut({ redirect: false });
        }}
      >
        <Link href="/login">
          {session.status === "authenticated" ? "Logout" : "Login"}
        </Link>
      </Button>
    </nav>
  );
}
