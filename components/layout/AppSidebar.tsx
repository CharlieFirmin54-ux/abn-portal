"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  Mail,
  FileText,
  Settings,
} from "lucide-react";

import NavItem from "./NavItem";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: ClipboardList,
  },
  {
    label: "Properties",
    href: "/properties",
    icon: Building2,
  },
  {
    label: "Emails",
    href: "/emails",
    icon: Mail,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">

      {/* Logo */}

      <div className="border-b border-zinc-800 p-8">

        <div className="flex justify-center">

          <Image
            src="/images/abn-logo.png"
            alt="ABN Maintenance"
            width={170}
            height={170}
            priority
            className="h-auto w-auto"
          />

        </div>

        <h2 className="mt-6 text-center text-xl font-bold text-white">
          ABN Maintenance
        </h2>

        <p className="mt-1 text-center text-sm text-zinc-500">
          Operations Portal
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {navigation.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-zinc-800 p-6">

        <div className="flex items-center gap-3">

          <div className="h-3 w-3 rounded-full rounded-full bg-green-500" />

          <span className="text-sm text-zinc-400">
            System Online
          </span>

        </div>

        <div className="mt-4">

          <p className="text-xs text-zinc-600">
            ABN Maintenance
          </p>

          <p className="text-xs text-zinc-600">
            Version 1.0.0
          </p>

        </div>

      </div>

    </aside>
  );
}