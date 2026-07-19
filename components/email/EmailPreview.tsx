"use client";

import { Calendar, Mail, Paperclip, User } from "lucide-react";
import { Email } from "./EmailLayout";

interface EmailPreviewProps {
  email: Email;
}

export default function EmailPreview({
  email,
}: EmailPreviewProps) {
  return (
    <div className="flex h-full flex-col bg-zinc-900">

      {/* Header */}

      <div className="border-b border-zinc-800 p-8">

        <div className="mb-4 flex items-center gap-3">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              email.priority === "P1"
                ? "bg-red-500/20 text-red-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {email.priority}
          </span>

          <span className="text-sm text-zinc-500">
            {email.unread ? "Unread" : "Read"}
          </span>

        </div>

        <h1 className="text-3xl font-bold text-white">
          {email.subject}
        </h1>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-zinc-400">

          <div className="flex items-center gap-2">
            <User size={16} />
            {email.name}
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            {email.email}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {email.time}
          </div>

        </div>

      </div>

      {/* Email */}

      <div className="flex-1 overflow-y-auto p-8">

        <div className="whitespace-pre-line text-zinc-300 leading-7">
          {email.body}
        </div>

      </div>

      {/* Attachments */}

      <div className="border-t border-zinc-800 p-6">

        <h3 className="mb-4 font-semibold text-white">
          Attachments
        </h3>

        <button className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-300 transition hover:border-blue-500">

          <Paperclip size={18} />

          No attachments

        </button>

      </div>

    </div>
  );
}