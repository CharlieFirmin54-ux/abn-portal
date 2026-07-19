"use client";

import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">

      {/* Logo */}

      <div className="flex justify-center">
        <Image
          src="/images/abn-logo.png"
          alt="ABN Maintenance"
          width={90}
          height={90}
          priority
        />
      </div>

      <h1 className="mt-6 text-center text-3xl font-bold text-white">
        ABN Portal
      </h1>

      <p className="mt-2 text-center text-sm text-slate-400">
        Sign in to continue
      </p>

      <form className="mt-8 space-y-5">

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

            <Mail className="mr-3 h-5 w-5 text-slate-500" />

            <input
              type="email"
              placeholder="name@abnmaintenance.co.uk"
              className="h-14 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

            <Lock className="mr-3 h-5 w-5 text-slate-500" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              className="h-14 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 transition hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        <button
          className="mt-3 h-14 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-500"
        >
          Sign In
        </button>

      </form>

      <p className="mt-8 text-center text-xs text-slate-500">
        © 2026 ABN Maintenance
      </p>

    </div>
  );
}