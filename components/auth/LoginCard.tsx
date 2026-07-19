"use client";

import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginCard() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">

      <div className="flex justify-center">
        <Image
          src="/images/abn-logo.png"
          alt="ABN Maintenance"
          width={120}
          height={120}
          priority
        />
      </div>

      <h1 className="mt-6 text-center text-3xl font-bold text-white">
        ABN Maintenance
      </h1>

      <p className="mt-2 text-center text-sm text-slate-400">
        Operations Portal
      </p>

      <form onSubmit={login} className="mt-8 space-y-5">

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

            <Mail className="mr-3 h-5 w-5 text-slate-500" />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@abnmaintenance.co.uk"
              className="h-14 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />

          </div>
        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

            <Lock className="mr-3 h-5 w-5 text-slate-500" />

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="h-14 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>

        </div>

        {error && (
          <div className="rounded-xl bg-red-500/20 border border-red-500/40 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-3 h-14 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

      </form>

      <p className="mt-8 text-center text-xs text-slate-500">
        © 2026 ABN Maintenance
      </p>

    </div>
  );
}