import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaDev } from "react-icons/fa6";
import Logo from "../common/Logo";

export default async function Footer() {
  const settings = await prisma.setting.findFirst();
  const siteName = settings?.siteName ?? "StackQuill";

  const portfolioUrl = "https://dainyjose.github.io/my-portfolio";

  const socialLinks = [
    { label: "LinkedIn", href: settings?.linkedinUrl, icon: FaLinkedinIn },
    { label: "GitHub", href: settings?.githubUrl, icon: FaGithub },
    { label: "Dev.to", href: settings?.devtoUrl, icon: FaDev },
    {
      label: "Email",
      href: settings?.email ? `mailto:${settings.email}` : undefined,
      icon: Mail,
    },
  ].filter(link => link.href);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6 sm:py-12">
        {/* Branding */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo width={34} height={34} />
            <span className="text-xl font-bold tracking-tight">{siteName}</span>
          </Link>

          <p className="mt-3 max-w-fit text-sm leading-6 text-muted-foreground">
            Practical tutorials, real-world projects, and engineering insights for developers.
          </p>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Footer navigation"
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium"
        >
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noopener noreferrer"}
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        )}

        {/* Portfolio */}
        <div className="mt-6 text-center">
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-blue-500"
          >
            Built by Dainy Jose
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-5 text-center">
          <p className="text-xs leading-5 text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
