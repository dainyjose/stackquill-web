import SettingsForm from "@/components/admin/SettingsForm";
import { prisma } from "@/lib/prisma";
import { SettingsData } from "@/types/settings";

export default async function SettingsPage() {
  const settings = await prisma.setting.findFirst();

  const initialData: SettingsData = {
    siteName: settings?.siteName ?? "",
    siteTagline: settings?.siteTagline ?? "",
    siteDescription: settings?.siteDescription ?? "",
    siteUrl: settings?.siteUrl ?? "",

    heroBadge: settings?.heroBadge ?? "",
    heroTitle: settings?.heroTitle ?? "",
    heroDescription: settings?.heroDescription ?? "",
    heroTopics: settings?.heroTopics ?? "",

    aboutTitle: settings?.aboutTitle ?? "",
    aboutContent: settings?.aboutContent ?? "",

    logoLight: settings?.logoLight ?? "",
    logoDark: settings?.logoDark ?? "",
    favicon: settings?.favicon ?? "",

    email: settings?.email ?? "",

    githubUrl: settings?.githubUrl ?? "",
    linkedinUrl: settings?.linkedinUrl ?? "",
    twitterUrl: settings?.twitterUrl ?? "",
    devtoUrl: settings?.devtoUrl ?? "",
    mediumUrl: settings?.mediumUrl ?? "",
    hashnodeUrl: settings?.hashnodeUrl ?? "",

    metaTitle: settings?.metaTitle ?? "",
    metaDescription: settings?.metaDescription ?? "",
    metaKeywords: settings?.metaKeywords ?? "",
    googleAnalyticsId: settings?.googleAnalyticsId ?? "",
    googleSiteVerification: settings?.googleSiteVerification ?? "",

    copyright: settings?.copyright ?? "",
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-8 text-4xl font-bold">Site Settings</h1>

      <SettingsForm settings={initialData} />
    </div>
  );
}
