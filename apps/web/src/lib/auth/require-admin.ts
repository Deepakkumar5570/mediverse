import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const metadata = sessionClaims?.metadata as
    | {
        role?: string;
      }
    | undefined;

  const role = metadata?.role;

  if (role !== "admin") {
    throw new Error("Forbidden");
  }

  return userId;
}