import { prisma } from "@/lib/prisma";
import Logo from "../common/Logo";

export default async function Footer() {
  const settings = await prisma.setting.findFirst();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        <Logo
          width={32}
          height={32}
        />
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {settings?.siteName ?? "ThoughtForge"}.
          All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-sm">
          {settings?.linkedinUrl && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}

          {settings?.githubUrl && (
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}

          {settings?.devtoUrl && (
            <a
              href={settings.devtoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Dev.to
            </a>
          )}

          {settings?.email && <a href={`mailto:${settings.email}`}>Email</a>}
        </div>
      </div>
    </footer>
  );
}
