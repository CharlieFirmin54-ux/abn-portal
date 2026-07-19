export interface ParsedEmail {
  jobNumber: string | null;
  priority: string;
  subject: string;

  tenantName: string | null;
  tenantPhone: string | null;
  tenantEmail: string | null;

  address: string | null;
  postcode: string | null;
  organisation: string | null;

  dateIssued: string | null;
  dueDate: string | null;

  category: string;
  description: string;
}

export class EmailParser {
  private static convertUkDate(date: string | null): string | null {
    if (!date) return null;

    const parts = date.trim().split("/");

    if (parts.length !== 3) return null;

    const [day, month, year] = parts;

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  static parse(email: string): ParsedEmail {
    const jobNumber =
      email.match(/Job\s*No[:\s]*([0-9]+)/i)?.[1] ?? null;

    const tenantName =
      email.match(/Tenant[:\s]*(.+)/i)?.[1]?.trim() ?? null;

    const tenantPhone =
      email.match(/(?:Phone|Telephone)[:\s]*([0-9+\s]+)/i)?.[1]?.trim() ??
      null;

    const tenantEmail =
      email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ??
      null;

    const postcode =
      email.match(
        /\b[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}\b/i
      )?.[0] ?? null;

    const priority = /P1/i.test(email) ? "P1" : "Normal";

    const issuedRaw =
      email.match(/Date\s*Issued[:\s]*([0-9\/]+)/i)?.[1] ?? null;

    const dueRaw =
      email.match(/Due\s*Date[:\s]*([0-9\/]+)/i)?.[1] ?? null;

    const dateIssued = this.convertUkDate(issuedRaw);
    const dueDate = this.convertUkDate(dueRaw);

    const organisation =
      email.match(/(?:Organisation|Client)[:\s]*(.+)/i)?.[1]?.trim() ??
      null;

    let category = "General";

    const lower = email.toLowerCase();

    if (
      lower.includes("boiler") ||
      lower.includes("heating") ||
      lower.includes("radiator") ||
      lower.includes("hot water")
    ) {
      category = "Heating";
    } else if (
      lower.includes("electric") ||
      lower.includes("socket") ||
      lower.includes("fuse")
    ) {
      category = "Electrical";
    } else if (
      lower.includes("leak") ||
      lower.includes("pipe") ||
      lower.includes("water")
    ) {
      category = "Plumbing";
    } else if (
      lower.includes("window") ||
      lower.includes("glass")
    ) {
      category = "Windows";
    } else if (
      lower.includes("lock") ||
      lower.includes("door")
    ) {
      category = "Locksmith";
    } else if (
      lower.includes("grass") ||
      lower.includes("tree") ||
      lower.includes("fence")
    ) {
      category = "Grounds";
    }

    let address: string | null = null;

    const addressMatch = email.match(
      /Address[:\s]*([\s\S]*?)Postcode/i
    );

    if (addressMatch) {
      address = addressMatch[1]
        .replace(/\r?\n/g, ", ")
        .replace(/,\s*,/g, ",")
        .trim();
    }

    const subject = jobNumber
      ? `Job ${jobNumber}`
      : "Unknown Job";

    return {
      jobNumber,
      priority,
      subject,

      tenantName,
      tenantPhone,
      tenantEmail,

      address,
      postcode,
      organisation,

      dateIssued,
      dueDate,

      category,

      description: email.trim(),
    };
  }
}