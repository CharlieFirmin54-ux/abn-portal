"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

export default function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
        active
          ? "bg-red-600 text-white shadow-lg"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
      }`}
    >
      <Icon size={20} />

      <span className="font-medium">
        {label}
      </span>
    </Link>
  );
}