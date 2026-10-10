import "dotenv/config";
import { PrismaClient, BlogStatus } from "@prisma/client";

const prisma = new PrismaClient();

const categoryMap: Record<string, { name: string; slug: string }> = {
  android: { name: "Android", slug: "android" },
  reactnative: { name: "React Native", slug: "react-native" },
  career: { name: "Career", slug: "career" },
  ga4: { name: "GA4", slug: "ga4" },
  firebase: { name: "Firebase", slug: "firebase" },
  security: { name: "Security", slug: "security" },
  cicd: { name: "CI/CD", slug: "cicd" },
  react: { name: "React", slug: "react" },
  git: { name: "Git", slug: "git" },
  mobile: { name: "Mobile", slug: "mobile" },
  vscode: { name: "VS Code", slug: "vscode" },
};

interface DevToArticle {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  published_at: string;
  cover_image: string | null;
  url: string;
}

interface DevToArticleDetail extends DevToArticle {
  body_markdown: string;
}

function getCategory(tags: string[]) {
  // Prefer the more specific category before generic tags.
  const priority = [
    "android",
    "reactnative",
    "security",
    "cicd",
    "ga4",
    "firebase",
    "vscode",
    "git",
    "career",
    "react",
    "mobile",
  ];

  for (const tag of priority) {
    if (tags.map(t => t.toLowerCase()).includes(tag)) {
      return categoryMap[tag];
    }
  }

  return { name: "General", slug: "general" };
}

function removeEmojis(text: string): string {
  return text
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\uFE0F/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function createDescription(article: DevToArticleDetail): string {
  const description = article.description?.trim();

  if (description) {
    return description.slice(0, 200);
  }

  const content = article.body_markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*`_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!content) {
    return article.title;
  }

  const firstSentence = content.match(/^.{1,197}?[.!?](?:\s|$)/);

  return (firstSentence?.[0] ?? content.slice(0, 197) + "...").trim();
}
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "StackQuill-Article-Importer",
    },
  });

  if (!response.ok) {
    throw new Error(`Dev.to API failed (${response.status}): ${url}`);
  }

  return response.json() as Promise<T>;
}

async function main() {
  const apiBaseUrl = process.env.DEV_API_BASE_URL;
  const devToUsername = process.env.DEVTO_USERNAME;

  const articles = await fetchJson<DevToArticle[]>(
    `${apiBaseUrl?.replace(/\/$/, "")}/articles?username=${encodeURIComponent(devToUsername)}&per_page=100`
  );

  console.log(`Found ${articles.length} Dev.to articles.`);

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (const article of articles) {
    try {
      const slug = removeEmojis(article.slug);

      const existing = await prisma.blog.findUnique({
        where: { slug },
        select: { id: true },
      });
      // Do not overwrite articles already created in StackQuill.

      if (existing) {
        console.log(`SKIP: ${article.title} (slug already exists)`);
        skipped++;
        continue;
      }

      const detail = await fetchJson<DevToArticleDetail>(`${API_BASE}/articles/${article.id}`);

      if (!detail.body_markdown?.trim()) {
        console.warn(`SKIP: ${article.title} (no Markdown content)`);
        skipped++;
        continue;
      }

      const categoryInfo = getCategory(detail.tags ?? []);

      const category = await prisma.category.upsert({
        where: { slug: categoryInfo.slug },
        update: {},
        create: categoryInfo,
      });

      const title = removeEmojis(detail.title);
      const description = removeEmojis(createDescription(detail));
      const metaTitle = title;
      const metaDescription = description;

      await prisma.blog.create({
        data: {
          title,
          slug,
          description,
          content: detail.body_markdown,
          keywords: (detail.tags ?? []).join(", "),
          seoTitle: metaTitle,
          seoDescription: metaDescription,
          coverImage: detail.cover_image || null,
          categoryId: category.id,
          status: BlogStatus.DRAFT,
          featured: false,
          publishedAt: null,
          originalPublishedAt: detail.published_at ? new Date(detail.published_at) : null,
        },
      });

      console.log(`IMPORTED: ${detail.title}`);
      imported++;

      // Keep requests sequential and reduce API request pressure.
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`FAILED: ${article.title}`, error);
      failed++;
    }
  }

  console.log("\nImport finished.");
  console.log({ imported, skipped, failed });
}

main()
  .catch(error => {
    console.error("Import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
