import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaDev } from "react-icons/fa6";
import Logo from "../common/Logo";

const portfolioUrl = "https://dainyjose.github.io/my-portfolio";

export default async function Footer() {
  const settings = await prisma.setting.findFirst();

  const siteName = settings?.siteName ?? "StackQuill";

  const socialLinks = [
    {
      label: "LinkedIn",
      href: settings?.linkedinUrl ?? undefined,
      icon: FaLinkedinIn,
    },
    {
      label: "GitHub",
      href: settings?.githubUrl ?? undefined,
      icon: FaGithub,
    },
    {
      label: "Dev.to",
      href: settings?.devtoUrl ?? undefined,
      icon: FaDev,
    },
    {
      label: "Email",
      href: settings?.email ? `mailto:${settings.email}` : undefined,
      icon: Mail,
    },
  ].filter(link => link.href);

  const footerLinks = [
    { href: "/blog", label: "Articles" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
          {/* Brand */}
          <div className="max-w-lg">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo width={38} height={38} />

              <span className="text-xl font-bold tracking-tight text-foreground">
                {siteName}
                <span className="text-primary">.</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              A space for learning, building, and sharing. Practical tutorials, real-world projects,
              and thoughtful insights from the world of software development.
            </p>

            <p className="mt-5 text-sm font-medium tracking-wide text-primary">
              Learning. Building. Sharing.
            </p>
          </div>

          {/* Navigation and Social */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Explore
              </h2>

              <nav aria-label="Footer navigation" className="mt-5 flex flex-col items-start gap-4">
                {footerLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Connect
              </h2>

              {socialLinks.length > 0 && (
                <div className="mt-5 flex flex-col items-start gap-4">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={label === "Email" ? undefined : "_blank"}
                      rel={label === "Email" ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      <Icon size={16} />
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>

          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Built by Dainy Jose
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
