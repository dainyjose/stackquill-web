"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/ui/ThemeToggle"), {
  ssr: false,
});

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          ThoughtForge
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
