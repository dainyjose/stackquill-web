/*
  Warnings:

  - You are about to drop the column `aboutMe` on the `Setting` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL,
    "siteTagline" TEXT,
    "siteDescription" TEXT,
    "siteUrl" TEXT,
    "heroBadge" TEXT,
    "heroTitle" TEXT,
    "heroDescription" TEXT,
    "aboutTitle" TEXT,
    "aboutContent" TEXT,
    "logoLight" TEXT,
    "logoDark" TEXT,
    "favicon" TEXT,
    "email" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "devtoUrl" TEXT,
    "mediumUrl" TEXT,
    "hashnodeUrl" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "googleAnalyticsId" TEXT,
    "googleSiteVerification" TEXT,
    "copyright" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Setting" ("createdAt", "devtoUrl", "email", "githubUrl", "id", "linkedinUrl", "metaDescription", "metaTitle", "siteName", "siteTagline", "updatedAt") SELECT "createdAt", "devtoUrl", "email", "githubUrl", "id", "linkedinUrl", "metaDescription", "metaTitle", "siteName", "siteTagline", "updatedAt" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
