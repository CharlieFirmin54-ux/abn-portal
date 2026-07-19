import { supabase } from "../supabase";

export interface Job {
  id: string;
  job_number: string;
  priority: string;
  status: string;
  subject: string | null;
  description: string | null;

  tenant_name: string | null;
  tenant_phone: string | null;
  tenant_email: string | null;

  address: string | null;
  postcode: string | null;
  organisation: string | null;

  date_issued: string | null;
  due_date: string | null;

  property_id: string | null;
  category_id: string | null;

  assigned_to: string | null;

  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalJobs: number;
  p1Jobs: number;
  openJobs: number;
  completedJobs: number;
}

export class JobService {
  /**
   * Returns every job ordered newest first
   */
  static async getAllJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      throw error;
    }

    return (data ?? []) as Job[];
  }

  /**
   * Find one job by job number
   */
  static async getJob(jobNumber: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("job_number", jobNumber)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data as Job | null;
  }

  /**
   * Create a brand new job
   */
  static async createJob(job: Partial<Job>): Promise<Job> {
    const { data, error } = await supabase
      .from("jobs")
      .insert(job)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data as Job;
  }

  /**
   * Update an existing job
   */
  static async updateJob(
    id: string,
    values: Partial<Job>
  ): Promise<Job> {
    const { data, error } = await supabase
      .from("jobs")
      .update({
        ...values,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data as Job;
  }

  /**
   * Delete a job
   */
  static async deleteJob(id: string) {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return true;
  }

  /**
   * Dashboard numbers
   */
  static async getDashboardStats(): Promise<DashboardStats> {
    const jobs = await this.getAllJobs();

    return {
      totalJobs: jobs.length,

      p1Jobs: jobs.filter(
        (j) => j.priority?.toUpperCase() === "P1"
      ).length,

      openJobs: jobs.filter(
        (j) => j.status !== "Completed"
      ).length,

      completedJobs: jobs.filter(
        (j) => j.status === "Completed"
      ).length,
    };
  }

  /**
   * Creates a fake job for testing
   */
  static async createTestJob() {
    return this.createJob({
      job_number: Math.floor(
        30000 + Math.random() * 9999
      ).toString(),

      priority: "P1",

      status: "New",

      subject: "No Hot Water",

      description:
        "Automatically created test job.",

      tenant_name: "John Smith",

      tenant_phone: "07123456789",

      tenant_email: "john@example.com",

      address: "60 Sycamore Drive",

      postcode: "IP28 8ST",

      organisation: "Baselets",

      assigned_to: null,
    });
  }
}