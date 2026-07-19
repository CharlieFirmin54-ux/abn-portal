import { NextResponse } from "next/server";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export async function GET() {
  const client = new ImapFlow({
    host: process.env.YAHOO_IMAP_HOST!,
    port: Number(process.env.YAHOO_IMAP_PORT),
    secure: process.env.YAHOO_IMAP_SECURE === "true",

    auth: {
      user: process.env.YAHOO_EMAIL!,
      pass: process.env.YAHOO_APP_PASSWORD!,
    },

    logger: false,
  });

  try {
    await client.connect();
    await client.mailboxOpen("INBOX");

    const search = await client.search({});
    const uids = Array.isArray(search)
      ? search.slice(-25).reverse()
      : [];

    const emails = [];

    for await (const message of client.fetch(uids, {
      uid: true,
      source: true,
      flags: true,
    })) {
      if (!message.source) continue;

      const parsed = await simpleParser(message.source);

      const sender = parsed.from?.value?.[0];

      const body =
        parsed.text ||
        (typeof parsed.html === "string"
          ? parsed.html.replace(/<[^>]*>/g, "")
          : "");

      emails.push({
        id: String(message.uid),
        uid: message.uid,
        name: sender?.name || sender?.address || "Unknown",
        email: sender?.address || "",
        subject: parsed.subject || "(No Subject)",
        preview: body.replace(/\s+/g, " ").trim().substring(0, 120),
        body,
        time: parsed.date?.toLocaleString("en-GB") ?? "",
        unread: !(message.flags?.has("\\Seen") ?? false),
        priority:
          (parsed.subject || "").toUpperCase().includes("P1")
            ? "P1"
            : "Normal",
      });
    }

    await client.logout();

    return NextResponse.json(emails);
  } catch (err: any) {
    console.error("IMAP ERROR:", err);

    try {
      if (client.usable) {
        await client.logout();
      }
    } catch {}

    return NextResponse.json(
      {
        success: false,
        error: "Unable to read Yahoo mailbox",

        debug: {
          name: err?.name,
          message: err?.message,
          code: err?.code,
          response: err?.response,
          responseText: err?.responseText,
          command: err?.command,
          stack: err?.stack,
        },
      },
      {
        status: 500,
      }
    );
  }
}