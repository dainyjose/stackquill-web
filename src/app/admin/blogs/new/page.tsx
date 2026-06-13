import { prisma } from "@/lib/prisma";
import BlogForm from "@/components/admin/BlogForm";

export default async function NewBlogPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Create Blog</h1>

      <BlogForm categories={categories} />
    </div>
  );
}
