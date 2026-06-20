/*
  Warnings:

  - You are about to drop the column `twitterUrl` on the `Setting` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL,
    "siteTagline" TEXT,
    "aboutMe" TEXT,
    "email" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "devtoUrl" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Setting" ("aboutMe", "createdAt", "githubUrl", "id", "linkedinUrl", "siteName", "siteTagline", "updatedAt") SELECT "aboutMe", "createdAt", "githubUrl", "id", "linkedinUrl", "siteName", "siteTagline", "updatedAt" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
