import { NextResponse } from "next/server";
import { JobService } from "@/lib/database/job-service";

export async function GET() {
  try {
    const jobs = await JobService.getAllJobs();
    const stats = await JobService.getDashboardStats();

    const recentJobs = jobs.slice(0, 10);

    return NextResponse.json({
      success: true,
      stats,
      recentJobs,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}