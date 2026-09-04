import { redirect } from "next/navigation";

import { requireAdmin } from "@/src/lib/auth/require-admin";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    await requireAdmin();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Unauthorized"
    ) {
      redirect("/sign-in");
    }

    redirect("/forbidden");
  }

  return children;
}