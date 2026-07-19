"use client";

import { useCallback, useEffect, useState } from "react";

interface DashboardStats {
  totalJobs: number;
  p1Jobs: number;
  openJobs: number;
  completedJobs: number;
}

interface Job {
  id: string;
  job_number: string;
  priority: string;
  status: string;

  tenant_name: string | null;
  address: string | null;
  organisation: string | null;

  created_at: string;
}

interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  recentJobs: Job[];
  message?: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    p1Jobs: 0,
    openJobs: 0,
    completedJobs: 0,
  });

  const [jobs, setJobs] = useState<Job[]>([]);

  const [loading, setLoading] = useState(true);

  const [creatingJob, setCreatingJob] = useState(false);

  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/dashboard");

      const data: DashboardResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message ?? "Unable to load dashboard.");
      }

      setStats(data.stats);
      setJobs(data.recentJobs);
    } catch (err) {
      console.error(err);

      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  async function createTestJob() {
    try {
      setCreatingJob(true);

      const response = await fetch("/api/jobs/test", {
        method: "POST",
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      await loadDashboard();

      alert(
        result.alreadyExists
          ? "Test job already exists."
          : "Test job created successfully."
      );
    } catch (err) {
      console.error(err);

      alert("Unable to create job.");
    } finally {
      setCreatingJob(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">

      <div className="mx-auto max-w-7xl">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              ABN Operations Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Live overview of maintenance jobs.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={loadDashboard}
              className="rounded-lg bg-zinc-800 px-5 py-3 hover:bg-zinc-700 transition"
            >
              Refresh
            </button>

            <button
              onClick={createTestJob}
              disabled={creatingJob}
              className="rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              {creatingJob ? "Creating..." : "Create Test Job"}
            </button>

          </div>

        </div>
                {error && (
          <div className="mb-6 rounded-lg border border-red-700 bg-red-950 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border border-red-700 bg-red-950/40 p-6 shadow-lg">
            <p className="text-red-300 text-sm font-medium">
              🔴 P1 Jobs
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {loading ? "--" : stats.p1Jobs}
            </h2>

            <p className="mt-4 text-red-200 text-sm">
              Highest priority jobs requiring immediate action.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-600 bg-yellow-950/30 p-6 shadow-lg">
            <p className="text-yellow-300 text-sm font-medium">
              🟡 Open Jobs
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {loading ? "--" : stats.openJobs}
            </h2>

            <p className="mt-4 text-yellow-200 text-sm">
              Jobs still waiting to be completed.
            </p>
          </div>

          <div className="rounded-xl border border-green-700 bg-green-950/30 p-6 shadow-lg">
            <p className="text-green-300 text-sm font-medium">
              🟢 Completed
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {loading ? "--" : stats.completedJobs}
            </h2>

            <p className="mt-4 text-green-200 text-sm">
              Successfully completed maintenance jobs.
            </p>
          </div>

          <div className="rounded-xl border border-blue-700 bg-blue-950/30 p-6 shadow-lg">
            <p className="text-blue-300 text-sm font-medium">
              📦 Total Jobs
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              {loading ? "--" : stats.totalJobs}
            </h2>

            <p className="mt-4 text-blue-200 text-sm">
              Total jobs currently stored in the system.
            </p>
          </div>

        </div>

        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">

          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

            <div>

              <h2 className="text-2xl font-semibold">
                Recent Jobs
              </h2>

              <p className="text-zinc-400 text-sm mt-1">
                Latest maintenance requests received.
              </p>

            </div>

            <div className="text-sm text-zinc-500">
              {jobs.length} shown
            </div>

          </div>
                    <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-zinc-800">

                <tr className="text-left text-sm uppercase tracking-wider text-zinc-400">

                  <th className="px-6 py-4">Job No</th>

                  <th className="px-6 py-4">Tenant</th>

                  <th className="px-6 py-4">Address</th>

                  <th className="px-6 py-4">Organisation</th>

                  <th className="px-6 py-4">Priority</th>

                  <th className="px-6 py-4">Status</th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-zinc-500"
                    >
                      Loading jobs...
                    </td>

                  </tr>

                ) : jobs.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-zinc-500"
                    >
                      No jobs found.
                    </td>

                  </tr>

                ) : (

                  jobs.map((job) => (

                    <tr
                      key={job.id}
                      className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                    >

                      <td className="px-6 py-5 font-semibold">
                        {job.job_number}
                      </td>

                      <td className="px-6 py-5">
                        {job.tenant_name ?? "-"}
                      </td>

                      <td className="px-6 py-5">
                        {job.address ?? "-"}
                      </td>

                      <td className="px-6 py-5">
                        {job.organisation ?? "-"}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            job.priority === "P1"
                              ? "bg-red-600 text-white"
                              : "bg-yellow-600 text-white"
                          }`}
                        >
                          {job.priority}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            job.status === "Completed"
                              ? "bg-green-600 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {job.status}
                        </span>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>
                  </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-zinc-800 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>
            ABN Maintenance Operations Portal
          </p>

          <p>
            Powered by Next.js • Supabase • TypeScript
          </p>
        </div>

      </div>

    </main>
  );
}