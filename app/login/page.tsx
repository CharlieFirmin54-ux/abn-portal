"use client";

import LoginBackground from "@/components/auth/LoginBackground";
import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <LoginBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <LoginCard />
      </div>
    </main>
  );
}