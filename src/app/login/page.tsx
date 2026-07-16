"use client";

import Logo from "@/components/common/Logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid username or password");
      return;
    }

    router.push("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 max-w-md rounded-2xl border p-8 shadow-sm"
    >
      <div className="mb-8 flex flex-col items-center">
        <Logo
          width={80}
          height={80}
        />

        <h1 className="mt-4 text-3xl font-bold">StackQuill</h1>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Admin Dashboard
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-50 p-3 text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-3 font-medium text-white dark:bg-white dark:text-black"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
