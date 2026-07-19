import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export interface EmailAttachment {
  filename: string;
  contentType: string;
  size: number;
}

export interface EmailMessage {
  id: string;
  uid: number;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  unread: boolean;
  priority: "P1" | "Normal";
  attachments: EmailAttachment[];
}

class YahooMailService {
  private client: ImapFlow;

  constructor() {
    this.client = new ImapFlow({
      host: process.env.YAHOO_IMAP_HOST!,
      port: Number(process.env.YAHOO_IMAP_PORT),
      secure: process.env.YAHOO_IMAP_SECURE === "true",
      auth: {
        user: process.env.YAHOO_EMAIL!,
        pass: process.env.YAHOO_APP_PASSWORD!,
      },
    });
  }

  async connect() {
    if (!this.client.usable) {
      await this.client.connect();
    }
  }

  async disconnect() {
    if (this.client.usable) {
      await this.client.logout();
    }
  }

  async getInbox(limit = 25): Promise<EmailMessage[]> {
    await this.connect();

    try {
      await this.client.mailboxOpen("INBOX");

      const searchResult = await this.client.search({}, { uid: true });

      if (searchResult === false) {
        return [];
      }

      const latestUids = searchResult.slice(-limit).reverse();

      const emails: EmailMessage[] = [];

      for await (const message of this.client.fetch(
        latestUids,
        {
          uid: true,
          envelope: true,
          source: true,
          flags: true,
        },
        {
          uid: true,
        }
      )) {
        if (!message.source) continue;

        const parsed = await simpleParser(message.source);

        const sender = parsed.from?.value?.[0];

        const body =
          parsed.text ??
          (typeof parsed.html === "string" ? parsed.html : "") ??
          "";

        const preview = body.replace(/\s+/g, " ").trim().substring(0, 120);

        const unread = message.flags
          ? !message.flags.has("\\Seen")
          : true;

        emails.push({
          id: String(message.uid),
          uid: message.uid,
          from: sender?.name || sender?.address || "Unknown",
          fromEmail: sender?.address || "",
          subject: parsed.subject || "(No Subject)",
          preview,
          body,
          date: parsed.date
            ? parsed.date.toLocaleString("en-GB")
            : "",
          unread,
          priority:
            (parsed.subject || "").toUpperCase().includes("P1")
              ? "P1"
              : "Normal",
          attachments: parsed.attachments.map((attachment) => ({
            filename: attachment.filename || "Attachment",
            contentType: attachment.contentType,
            size: attachment.size,
          })),
        });
      }

      return emails;
    } finally {
      await this.disconnect();
    }
  }
}

const yahoo = new YahooMailService();

export default yahoo;