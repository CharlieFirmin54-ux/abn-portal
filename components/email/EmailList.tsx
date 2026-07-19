"use client";

import { Email } from "./EmailLayout";
import EmailCard from "./EmailCard";

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onSelect: (email: Email) => void;
}

export default function EmailList({
  emails,
  selectedEmail,
  onSelect,
}: EmailListProps) {
  return (
    <div className="divide-y divide-zinc-800">
      {emails.map((email) => (
        <EmailCard
          key={email.id}
          email={email}
          selected={selectedEmail?.id === email.id}
          onClick={() => onSelect(email)}
        />
      ))}
    </div>
  );
}
