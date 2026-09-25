"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  const item = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      active
        ? "text-violet-600"
        : "text-slate-600 hover:text-violet-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-black text-white">
            M
          </span>
          <div className="leading-none">
            <span className="text-lg font-black tracking-tight text-slate-950">
              MediVerse
            </span>
            <span className="mt-1 hidden text-[8px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:block">
              Learn • Explore • Grow
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/learn/programs" className={item(pathname.startsWith("/learn/programs"))}>
            Programs
          </Link>
          <Link href="/learn" className={item(pathname === "/learn")}>
            Learn
          </Link>
          <Link href="/learn/community" className={item(pathname.startsWith("/learn/community"))}>
            Community
          </Link>
          {isSignedIn ? (
            <Link href="/learn/progress" className={item(pathname.startsWith("/learn/progress"))}>
              Progress
            </Link>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/learn/search"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-slate-50 hover:text-violet-600"
          >
            🔎
          </Link>

          {!isLoaded ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100" />
          ) : isSignedIn ? (
            <>
              <Link
                href="/learn"
                className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600"
              >
                Continue learning
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button type="button" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-600">
                  Sign up free
                </button>
              </SignUpButton>
            </>
          )}
        </div>

        <div className="md:hidden">
          <MobileNav isSignedIn={Boolean(isSignedIn)} isLoaded={isLoaded} />
        </div>
      </div>
    </header>
  );
}