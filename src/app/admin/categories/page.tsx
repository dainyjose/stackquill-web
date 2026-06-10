import CategoryForm from "@/components/admin/CategoryForm";
import CategoryList from "@/components/admin/CategoryList";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Categories</h1>

        <p className="mt-2 text-muted-foreground">Manage blog categories.</p>
      </div>

      <CategoryForm />

      <CategoryList categories={categories} />
    </div>
  );
}
