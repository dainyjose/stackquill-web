import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r p-6">
      <h2 className="mb-8 text-xl font-bold">ThoughtForge</h2>

      <nav className="space-y-3">
        <Link
          href="/admin"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/blogs"
          className="block"
        >
          Blogs
        </Link>

        <Link
          href="/admin/categories"
          className="block"
        >
          Categories
        </Link>

        <Link
          href="/admin/settings"
          className="block"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
