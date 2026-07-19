"use client";

import { useState } from "react";

import EmailFolders from "./EmailFolders";
import EmailToolbar from "./EmailToolbar";
import EmailList from "./EmailList";
import EmailPreview from "./EmailPreview";

export interface Email {
  id: number;
  name: string;
  subject: string;
  preview: string;
  body: string;
  email: string;
  time: string;
  unread: boolean;
  priority: "P1" | "Normal";
}

const demoEmails: Email[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    subject: "P1 - Boiler not working",
    preview:
      "The boiler has stopped working and we have no heating...",
    body:
      "Hello ABN Maintenance,\n\nOur boiler has completely stopped working this morning and we currently have no heating or hot water.\n\nCould somebody attend the property as soon as possible as there are young children living here.\n\nKind regards,\nJohn Smith",
    time: "09:42",
    unread: true,
    priority: "P1",
  },
  {
    id: 2,
    name: "Sarah Jones",
    email: "sarah@email.com",
    subject: "Kitchen tap leaking",
    preview:
      "The kitchen tap has been dripping for two days...",
    body:
      "Hi,\n\nOur kitchen tap has been leaking for the last two days.\n\nPlease could somebody attend when possible.\n\nMany thanks,\nSarah",
    time: "08:31",
    unread: false,
    priority: "Normal",
  },
  {
    id: 3,
    name: "David Brown",
    email: "david@email.com",
    subject: "Fence damaged",
    preview:
      "The rear fence has blown down in the wind...",
    body:
      "Good morning,\n\nThe rear garden fence has blown over during the storm.\n\nRegards,\nDavid",
    time: "Yesterday",
    unread: false,
    priority: "Normal",
  },
];

export default function EmailLayout() {
  const [selectedEmail, setSelectedEmail] = useState<Email>(
    demoEmails[0]
  );

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

      <div className="w-64 border-r border-zinc-800 bg-zinc-950">
        <EmailFolders />
      </div>

      <div className="flex w-96 flex-col border-r border-zinc-800">
        <EmailToolbar />

        <div className="flex-1 overflow-y-auto">
          <EmailList
            emails={demoEmails}
            selectedEmail={selectedEmail}
            onSelect={setSelectedEmail}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <EmailPreview email={selectedEmail} />
      </div>

    </div>
  );
}