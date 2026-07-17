import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminSidebar() {
  return (
    <aside className="flex w-64 flex-col border-r p-6">
      <h2 className="mb-8 text-xl font-bold">StackQuill</h2>

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
          href="/admin/messages"
          className="block"
        >
          Messages
        </Link>

        <Link
          href="/admin/profile"
          className="block"
        >
          Profile
        </Link>

        <Link
          href="/admin/settings"
          className="block"
        >
          Settings
        </Link>
      </nav>

      <div className="mt-auto pt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
