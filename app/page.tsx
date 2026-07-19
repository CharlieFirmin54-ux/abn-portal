"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-10">

        <h1 className="text-3xl font-bold text-center">
          ABN Portal
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Internal Operations
        </p>

        <form
          onSubmit={login}
          className="space-y-5"
        >

          <div>

            <label>Email</label>

            <input
              type="email"
              className="mt-2 w-full rounded-lg border p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div>

            <label>Password</label>

            <input
              type="password"
              className="mt-2 w-full rounded-lg border p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          {error && (
            <div className="rounded bg-red-100 p-3 text-red-700">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>

    </main>
  );
}