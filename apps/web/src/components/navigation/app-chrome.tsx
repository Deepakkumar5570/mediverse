"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "./navbar";
import { Footer } from "./footer";

type Props = {
  children: React.ReactNode;
};

export function AppChrome({
  children,
}: Props) {
  const pathname = usePathname();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}