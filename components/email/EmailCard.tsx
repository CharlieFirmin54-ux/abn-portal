"use client";

import { Email } from "./EmailLayout";

interface EmailCardProps {
  email: Email;
  selected: boolean;
  onClick: () => void;
}

export default function EmailCard({
  email,
  selected,
  onClick,
}: EmailCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full border-l-4 p-5 text-left transition ${
        selected
          ? "border-blue-500 bg-zinc-800"
          : "border-transparent bg-zinc-900 hover:border-blue-500 hover:bg-zinc-800"
      }`}
    >
      <div className="flex items-start justify-between">

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <h3
              className={`truncate text-sm ${
                email.unread
                  ? "font-bold text-white"
                  : "font-medium text-zinc-200"
              }`}
            >
              {email.name}
            </h3>

            {email.unread && (
              <div className="h-2 w-2 rounded-full bg-blue-500" />
            )}

          </div>

          <p className="mt-2 truncate text-sm font-semibold text-white">
            {email.subject}
          </p>

          <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
            {email.preview}
          </p>

        </div>

        <div className="ml-4 flex flex-col items-end gap-2">

          <span className="text-xs text-zinc-500">
            {email.time}
          </span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              email.priority === "P1"
                ? "bg-red-500/20 text-red-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {email.priority}
          </span>

        </div>

      </div>
    </button>
  );
}