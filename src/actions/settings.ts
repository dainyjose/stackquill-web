"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SettingsData } from "@/types/settings";
import { requireAdmin } from "@/lib/requireAdmin";

export async function saveSettings(data: SettingsData) {
  await requireAdmin();

  const existing = await prisma.setting.findFirst();

  if (existing) {
    await prisma.setting.update({
      where: {
        id: existing.id,
      },
      data: {
        siteName: data.siteName,
        siteTagline: data.siteTagline,
        siteDescription: data.siteDescription,
        siteUrl: data.siteUrl,

        heroBadge: data.heroBadge,
        heroTitle: data.heroTitle,
        heroDescription: data.heroDescription,
        heroTopics: data.heroTopics,

        aboutTitle: data.aboutTitle,
        aboutContent: data.aboutContent,

        logoLight: data.logoLight,
        logoDark: data.logoDark,
        favicon: data.favicon,

        email: data.email,

        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        twitterUrl: data.twitterUrl,
        devtoUrl: data.devtoUrl,
        mediumUrl: data.mediumUrl,
        hashnodeUrl: data.hashnodeUrl,

        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        googleAnalyticsId: data.googleAnalyticsId,
        googleSiteVerification: data.googleSiteVerification,

        copyright: data.copyright,
      },
    });
  } else {
    await prisma.setting.create({
      data: {
        siteName: data.siteName,
        siteTagline: data.siteTagline,
        siteDescription: data.siteDescription,
        siteUrl: data.siteUrl,

        heroBadge: data.heroBadge,
        heroTitle: data.heroTitle,
        heroDescription: data.heroDescription,

        aboutTitle: data.aboutTitle,
        aboutContent: data.aboutContent,

        logoLight: data.logoLight,
        logoDark: data.logoDark,
        favicon: data.favicon,

        email: data.email,

        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        twitterUrl: data.twitterUrl,
        devtoUrl: data.devtoUrl,
        mediumUrl: data.mediumUrl,
        hashnodeUrl: data.hashnodeUrl,

        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        googleAnalyticsId: data.googleAnalyticsId,
        googleSiteVerification: data.googleSiteVerification,

        copyright: data.copyright,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/blog");
  revalidatePath("/admin/settings");

  return {
    success: true,
  };
}
