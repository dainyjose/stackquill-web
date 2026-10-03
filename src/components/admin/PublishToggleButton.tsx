"use client";

import { togglePublished } from "@/actions/blog";

interface Props {
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function PublishToggleButton({ slug, status }: Props) {
  const isPublished = status === "PUBLISHED";

  return (
    <button onClick={() => togglePublished(slug)} className="rounded-lg border px-4 py-2">
      {isPublished ? "Unpublish" : "Publish"}
    </button>
  );
}
