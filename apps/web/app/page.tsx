import { auth } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">MediVerse</h1>

      {userId ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button className="px-6 py-3 rounded-lg bg-black text-white">
            Sign In
          </button>
        </SignInButton>
      )}
    </main>
  );
}