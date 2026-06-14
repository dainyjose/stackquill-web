"use client";

import { togglePublished } from "@/actions/blog";

interface Props {
  slug: string;
  published: boolean;
}

export default function PublishToggleButton({ slug, published }: Props) {
  return (
    <button
      onClick={() => togglePublished(slug)}
      className="rounded-lg border px-4 py-2"
    >
      {published ? "Unpublish" : "Publish"}
    </button>
  );
}
