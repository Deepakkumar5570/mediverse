"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg shadow-sm transition group-hover:scale-105">
            🩺
          </div>

          <div className="leading-none">
            <span className="text-lg font-black tracking-tight text-slate-950">
              Medi
              <span className="text-indigo-600">
                Verse
              </span>
            </span>

            <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
              Learn • Explore • Grow
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/learn/programs"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Programs
          </Link>

          <Link
            href="/learn/search"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            Search
          </Link>
        </nav>

        {/* DESKTOP ACCOUNT */}
        <div className="hidden items-center gap-2 md:flex">
          {!isLoaded ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-100" />
          ) : isSignedIn ? (
            <>
              <Link
                href="/learn"
                className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600"
              >
                Continue Learning
              </Link>

              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600"
                >
                  Create Account
                </button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          <MobileNav
            isSignedIn={Boolean(isSignedIn)}
            isLoaded={isLoaded}
          />
        </div>
      </div>
    </header>
  );
}