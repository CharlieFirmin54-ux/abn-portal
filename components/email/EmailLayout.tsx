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
        id: index + 1,
        name:
          mail.fromName ||
          mail.from ||
          "Unknown Sender",

        email:
          mail.fromEmail ||
          mail.from ||
          "",

        subject:
          mail.subject || "(No Subject)",

        preview:
          mail.preview ||
          mail.text?.substring(0, 120) ||
          "",

        body:
          mail.body ||
          mail.text ||
          "",

        time:
          mail.date
            ? new Date(mail.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",

        unread: mail.unread ?? false,

        priority:
          mail.subject?.toUpperCase().includes("P1")
            ? "P1"
            : "Normal",
      }));

      setEmails(formatted);

      if (formatted.length > 0) {
        setSelectedEmail(formatted[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
      <div className="w-64 border-r border-zinc-800 bg-zinc-950">
        <EmailFolders />
      </div>

      <div className="flex w-96 flex-col border-r border-zinc-800">
        <EmailToolbar />

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex h-full items-center justify-center text-zinc-400">
              Loading emails...
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

      <div className="flex-1 overflow-y-auto">
        {selectedEmail ? (
          <EmailPreview email={selectedEmail} />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">
            No email selected
          </div>
        )}
      </div>
    </div>
  );
}