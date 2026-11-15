export interface Heading {
  text: string;
  slug: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string): Heading[] {
  const headingLines = content.match(/^#{2,3}\s+.+$/gm) || [];

  const slugCounts = new Map<string, number>();

  return headingLines.map(heading => {
    const level = heading.startsWith("###") ? 3 : 2;
    const text = heading.replace(/^#{2,3}\s+/, "").trim();

    const baseSlug = slugifyHeading(text);
    const count = slugCounts.get(baseSlug) ?? 0;

    slugCounts.set(baseSlug, count + 1);

    return {
      text,
      slug: count === 0 ? baseSlug : `${baseSlug}-${count}`,
      level,
    };
  });
}
