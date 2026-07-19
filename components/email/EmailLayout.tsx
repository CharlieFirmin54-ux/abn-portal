"use client";

import { useEffect, useState } from "react";

import EmailFolders from "./EmailFolders";
import EmailToolbar from "./EmailToolbar";
import EmailList from "./EmailList";
import EmailPreview from "./EmailPreview";

export interface Email {
  id: number;
  name: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  priority: "P1" | "Normal";
}

export default function EmailLayout() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      setLoading(true);

      const response = await fetch("/api/emails", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load emails");
      }

      const data = await response.json();

      const formatted: Email[] = data.map((mail: any, index: number) => ({
        id: mail.id ?? index + 1,

        // Sender
        name:
          mail.name ||
          mail.fromName ||
          mail.from ||
          "Unknown Sender",

        // Email Address
        email:
          mail.email ||
          mail.fromEmail ||
          mail.from ||
          "",

        // Subject
        subject:
          mail.subject ||
          "(No Subject)",

        // Preview
        preview:
          mail.preview ||
          mail.body?.substring(0, 120) ||
          mail.text?.substring(0, 120) ||
          "",

        // Full Body
        body:
          mail.body ||
          mail.text ||
          "",

        // Time
        time:
          mail.time ||
          (mail.date
            ? new Date(mail.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""),

        // Read Status
        unread:
          mail.unread ?? false,

        // Priority
        priority:
          mail.priority
            ? mail.priority
            : mail.subject?.toUpperCase().includes("P1")
            ? "P1"
            : "Normal",
      }));

      setEmails(formatted);

      if (formatted.length > 0) {
        setSelectedEmail(formatted[0]);
      }
    } catch (error) {
      console.error("Failed to load emails:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-800 bg-zinc-950">
        <EmailFolders />
      </div>

      {/* Email List */}
      <div className="flex w-96 flex-col border-r border-zinc-800">
        <EmailToolbar />

        <div className="flex-1 overflow-y-auto">

          {loading ? (
            <div className="flex h-full items-center justify-center text-zinc-400">
              Loading emails...
            </div>
          ) : emails.length === 0 ? (
            <div className="flex h-full items-center justify-center text-zinc-500">
              No emails found
            </div>
          ) : (
            <EmailList
              emails={emails}
              selectedEmail={selectedEmail}
              onSelect={setSelectedEmail}
            />
          )}

        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-y-auto">

        {selectedEmail ? (
          <EmailPreview email={selectedEmail} />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">
            Select an email to view
          </div>
        )}

      </div>
    </div>
  );
}