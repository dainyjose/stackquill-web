export default function AdminPage() {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h2>Total Posts</h2>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2>Published</h2>
          <p className="mt-2 text-3xl font-bold">10</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2>Drafts</h2>
          <p className="mt-2 text-3xl font-bold">2</p>
        </div>
      </div>
    </div>
  );
}
