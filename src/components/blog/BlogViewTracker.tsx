"use client";

import { useEffect } from "react";
import { incrementBlogViews } from "@/actions/blog";

interface BlogViewTrackerProps {
  slug: string;
}

export default function BlogViewTracker({ slug }: BlogViewTrackerProps) {
  useEffect(() => {
    incrementBlogViews(slug);
  }, [slug]);

  return null;
}
