"use client";

import { createCategory } from "@/actions/category";
import { useState } from "react";

export default function CategoryForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    try {
      await createCategory({
        name,
        slug,
      });

      setName("");

      alert("Category created");
    } catch (error) {
      console.error(error);

      alert("Failed to create category");
    }
  };

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">Add Category</h2>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="React Native"
          className="flex-1 rounded-lg border p-3"
        />

        <button
          type="submit"
          className="rounded-lg border px-6 py-3"
        >
          Add
        </button>
      </form>
    </div>
  );
}
