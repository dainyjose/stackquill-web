import CategoryForm from "@/components/admin/CategoryForm";
import CategoryList from "@/components/admin/CategoryList";

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Categories</h1>

        <p className="mt-2 text-muted-foreground">Manage blog categories.</p>
      </div>

      <CategoryForm />

      <CategoryList />
    </div>
  );
}
