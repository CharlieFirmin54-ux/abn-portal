"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  Mail,
  FileText,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: ClipboardList,
  },
  {
    name: "Properties",
    href: "/properties",
    icon: Building2,
  },
  {
    name: "Emails",
    href: "/emails",
    icon: Mail,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">

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

      <nav className="flex-1 space-y-2 p-4">

        {navigation.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-zinc-800 p-6">

        <div className="flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-green-500" />

          <span className="text-sm text-zinc-400">
            System Online
          </span>

        </div>

        <p className="mt-3 text-xs text-zinc-600">
          Version 1.0.0
        </p>

      </div>

    </aside>
  );
}