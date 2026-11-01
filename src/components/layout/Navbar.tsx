"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import Logo from "../common/Logo";

const ThemeToggle = dynamic(() => import("@/components/ui/ThemeToggle"), {
  ssr: false,
});

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-3xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5">
          <Logo width={38} height={38} />
          <span className="text-xl font-bold tracking-tight">StackQuill</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden ">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-5 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
