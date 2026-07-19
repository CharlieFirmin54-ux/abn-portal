"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function AppHeader() {
  const greeting = (() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  })();

  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="flex h-24 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">

      <div>

        <h1 className="text-3xl font-bold text-white">
          {greeting}
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          {today}
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">

          <Search
            size={18}
            className="text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search jobs, properties..."
            className="w-72 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />

        </div>

        <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:bg-zinc-800">

          <Bell size={20} />

        </button>

        <button className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 transition hover:bg-zinc-800">

          <UserCircle size={24} />

          <div className="text-left">

            <p className="text-sm font-semibold text-white">
              Charlie
            </p>

            <p className="text-xs text-zinc-500">
              Administrator
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}