import type { ReactNode } from "react";

import AppLayout from "@/components/layout/AppLayout";

interface PortalLayoutProps {
  children: ReactNode;
}

export default function PortalLayout({
  children,
}: PortalLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}