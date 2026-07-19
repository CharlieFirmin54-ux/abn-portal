import { NextResponse } from "next/server";
import { JobService } from "@/lib/database/job-service";
import { EmailParser } from "@/lib/automation/parser";

export async function POST() {
  try {
    const sampleEmail = `
Job No: 39206

Priority: P1

Tenant: Esteban Coronado

Phone: 07435076225

Email: crownguzman@gmail.com

Address:
60 Sycamore Drive
Beck Row

Postcode: IP28 8ST

Organisation: Baselets

Date Issued: 15/07/2026

Due Date: 16/07/2026

Job Details:
P1 No Hot Water
`;

    const parsed = EmailParser.parse(sampleEmail);

    if (!parsed.jobNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to find a job number.",
        },
        { status: 400 }
      );
    }

    // Prevent duplicate jobs
    const existing = await JobService.getJob(parsed.jobNumber);

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyExists: true,
        message: "Job already exists.",
        job: existing,
      });
    }

    const job = await JobService.createJob({
      job_number: parsed.jobNumber,
      priority: parsed.priority,
      status: "New",

      subject: parsed.subject,
      description: parsed.description,

      tenant_name: parsed.tenantName,
      tenant_phone: parsed.tenantPhone,
      tenant_email: parsed.tenantEmail,

      address: parsed.address,
      postcode: parsed.postcode,
      organisation: parsed.organisation,

      date_issued: parsed.dateIssued,
      due_date: parsed.dueDate,
    });

    return NextResponse.json({
      success: true,
      alreadyExists: false,
      job,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create test job.",
      },
      { status: 500 }
    );
  }
}