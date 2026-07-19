import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ABN Portal",
    template: "%s | ABN Portal",
  },
  description: "ABN Maintenance Operations Portal",
  applicationName: "ABN Portal",

  icons: {
    icon: "/images/abn-logo.png",
    shortcut: "/images/abn-logo.png",
    apple: "/images/abn-logo.png",
  },

  openGraph: {
    title: "ABN Portal",
    description: "ABN Maintenance Operations Portal",
    images: ["/images/abn-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}