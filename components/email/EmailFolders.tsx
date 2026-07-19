"use client";

import {
  Inbox,
  Star,
  Send,
  Archive,
  Trash2,
} from "lucide-react";

const folders = [
  {
    icon: Inbox,
    label: "Inbox",
    count: 24,
    active: true,
  },
  {
    icon: Star,
    label: "Starred",
    count: 5,
  },
  {
    icon: Send,
    label: "Sent",
    count: 132,
  },
  {
    icon: Archive,
    label: "Archive",
    count: 842,
  },
  {
    icon: Trash2,
    label: "Deleted",
    count: 2,
  },
];

export default function EmailFolders() {
  return (
    <div className="flex h-full flex-col">

      <div className="border-b border-zinc-800 p-6">

        <h2 className="text-xl font-bold text-white">
          Emails
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Yahoo Mail
        </p>

      </div>

      <nav className="flex-1 p-4">

        <div className="space-y-2">

          {folders.map((folder) => {
            const Icon = folder.icon;

            return (
              <button
                key={folder.label}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition ${
                  folder.active
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">

                  <Icon size={18} />

                  <span>{folder.label}</span>

                </div>

                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                  {folder.count}
                </span>

              </button>
            );
          })}

        </div>

      </nav>

      <div className="border-t border-zinc-800 p-5">

        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3">

          <div className="flex items-center gap-2">

            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

            <span className="text-sm font-medium text-green-400">
              Yahoo Connected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}