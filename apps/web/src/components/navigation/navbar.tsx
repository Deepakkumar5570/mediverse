"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  const isLearnActive = pathname.startsWith("/learn");
  const isCommunityActive = pathname.startsWith("/learn/community");
  const isProgressActive = pathname.startsWith("/learn/progress");
  const isSearchActive = pathname.startsWith("/learn/search");

  const navItemClass = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      active
        ? "bg-indigo-50 text-indigo-600"
        : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg shadow-sm transition group-hover:scale-105">
            🩺
          </div>

          <div className="leading-none">
            <span className="text-lg font-black tracking-tight text-slate-950">
              Medi
              <span className="text-indigo-600">Verse</span>
            </span>

            <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
              Learn • Explore • Grow
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 md:flex">

          {/* LEARN */}
          <div className="group relative">
            <button
              type="button"
              className={navItemClass(isLearnActive)}
            >
              <span className="flex items-center gap-1">
                Learn
                <span className="text-[10px] transition group-hover:rotate-180">
                  ▼
                </span>
              </span>
            </button>

            <div className="invisible absolute left-0 top-full w-52 translate-y-1 rounded-xl border border-slate-200 bg-white p-1.5 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link
                href="/learn"
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  pathname === "/learn"
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
                }`}
              >
                Continue Learning
              </Link>

              <Link
                href="/learn/programs"
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  pathname.startsWith("/learn/programs")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
                }`}
              >
                Programs
              </Link>

              <Link
                href="/learn/search"
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isSearchActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
                }`}
              >
                Search
              </Link>
            </div>
          </div>

          {/* COMMUNITY */}
          <Link
            href="/learn/community"
            className={navItemClass(isCommunityActive)}
          >
            Community
          </Link>

          {/* PROGRESS */}
          {isSignedIn && (
            <Link
              href="/learn/progress"
              className={navItemClass(isProgressActive)}
            >
              Progress
            </Link>
          )}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-2 md:flex">

          {/* SEARCH */}
          <Link
            href="/learn/search"
            aria-label="Search"
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition ${
              isSearchActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
            }`}
          >
            🔍
          </Link>

          {!isLoaded ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-100" />
          ) : isSignedIn ? (
            <>
              {/* CONTINUE LEARNING */}
              <Link
                href="/learn"
                className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600"
              >
                Continue Learning
              </Link>

              {/* ACCOUNT */}
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