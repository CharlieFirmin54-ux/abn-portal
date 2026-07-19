"use client";

import { Search, RefreshCw, Filter } from "lucide-react";

export default function EmailToolbar() {
  return (
    <div className="border-b border-zinc-800 bg-zinc-900 p-4">

      <div className="flex items-center justify-between gap-4">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search emails..."
            className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Buttons */}

        <div className="flex items-center gap-2">

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 text-zinc-400 transition hover:border-blue-500 hover:text-white">
            <RefreshCw size={18} />
          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 text-zinc-400 transition hover:border-blue-500 hover:text-white">
            <Filter size={18} />
          </button>

        </div>

      </div>

      {/* Status */}

      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">

        <span>
          Inbox
        </span>

        <span className="text-green-400">
          ● Connected to Yahoo
        </span>

      </div>

    </div>
  );
}