"use client";

import { deleteBlog } from "@/actions/blog";
import { useRouter } from "next/navigation";

interface DeleteBlogButtonProps {
  slug: string;
}

export default function DeleteBlogButton({ slug }: DeleteBlogButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBlog(slug);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to delete blog");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-500 px-4 py-2 text-red-500"
    >
      Delete
    </button>
  );
}
