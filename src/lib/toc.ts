export function extractHeadings(content: string) {
    const headingLines = content.match(/^##\s+(.*)$/gm) || [];

    return headingLines.map((heading) => {
        const text = heading.replace(/^##\s+/, "");

        return {
            text,
            slug: text
                .toLowerCase()
                .replace(/[^\w\s]/g, "")
                .replace(/\s+/g, "-"),
        };
    });
}