"use client";

export default function LoginBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Top Glow */}
      <div className="absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

      {/* Bottom Glow */}
      <div className="absolute bottom-[-250px] right-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* Left Glow */}
      <div className="absolute left-[-200px] top-40 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

    </div>
  );
}