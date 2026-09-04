"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

type Props = {
  isSignedIn: boolean;
  isLoaded: boolean;
};

export function MobileNav({
  isSignedIn,
  isLoaded,
}: Props) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(true);

  function closeMenu() {
    setOpen(false);
  }

  const isHomeActive = pathname === "/";
  const isCommunityActive = pathname.startsWith("/learn/community");
  const isProgressActive = pathname.startsWith("/learn/progress");
  const isLearnActive =
    pathname === "/learn" ||
    pathname.startsWith("/learn/programs") ||
    pathname.startsWith("/learn/search");

  const itemClass = (active: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
      active
        ? "bg-indigo-50 text-indigo-600"
        : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
    }`;

  const subItemClass = (active: boolean) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      active
        ? "bg-indigo-50 text-indigo-600"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <div className="relative">

      {/* MENU BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <>
          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="fixed inset-0 top-16 z-40 bg-slate-950/20 backdrop-blur-[2px]"
          />

          {/* SIDEBAR */}
          <aside className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-[min(88vw,380px)] overflow-y-auto border-l border-slate-200 bg-white shadow-2xl">

            {/* HEADER */}
            <div className="border-b border-slate-100 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg">
                  🩺
                </div>

                <div>
                  <p className="text-base font-black tracking-tight text-slate-950">
                    Medi
                    <span className="text-indigo-600">Verse</span>
                  </p>

                  <p className="text-xs text-slate-400">
                    Learn • Explore • Grow
                  </p>
                </div>
              </div>
            </div>

            {/* NAVIGATION */}
            <nav className="space-y-1 p-3">

              {/* HOME */}
              <Link
                href="/"
                onClick={closeMenu}
                className={itemClass(isHomeActive)}
              >
                <span className="text-base">🏠</span>
                Home
              </Link>

              {/* LEARN */}
              <div>
                <button
                  type="button"
                  onClick={() => setLearnOpen((value) => !value)}
                  className={itemClass(isLearnActive)}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">📚</span>
                    Learn
                  </span>

                  <span
                    className={`ml-auto text-xs transition-transform ${
                      learnOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {learnOpen && (
                  <div className="ml-9 mt-1 space-y-1 border-l border-slate-200 pl-3">

                    {isSignedIn && (
                      <Link
                        href="/learn"
                        onClick={closeMenu}
                        className={subItemClass(pathname === "/learn")}
                      >
                        🎯 Continue Learning
                      </Link>
                    )}

                    <Link
                      href="/learn/programs"
                      onClick={closeMenu}
                      className={subItemClass(
                        pathname.startsWith("/learn/programs"),
                      )}
                    >
                      📚 Programs
                    </Link>

                    <Link
                      href="/learn/search"
                      onClick={closeMenu}
                      className={subItemClass(
                        pathname.startsWith("/learn/search"),
                      )}
                    >
                      🔎 Search
                    </Link>
                  </div>
                )}
              </div>

              {/* COMMUNITY */}
              <Link
                href="/learn/community"
                onClick={closeMenu}
                className={itemClass(isCommunityActive)}
              >
                <span className="text-base">👥</span>
                Community
              </Link>

              {/* PROGRESS */}
              {isSignedIn && (
                <Link
                  href="/learn/progress"
                  onClick={closeMenu}
                  className={itemClass(isProgressActive)}
                >
                  <span className="text-base">📈</span>
                  Progress
                </Link>
              )}
            </nav>

            {/* DIVIDER */}
            <div className="mx-5 border-t border-slate-200" />

            {/* ACCOUNT */}
            <div className="p-3">
              {!isLoaded ? (
                <div className="space-y-2">
                  <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
                  <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
                </div>
              ) : isSignedIn ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">

                  <div className="mb-3 flex items-center gap-3">
                    <UserButton />

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        My Account
                      </p>

                      <p className="text-xs text-slate-500">
                        Profile & settings
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/learn"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Continue Learning
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">

                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      🔐 Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                      ✨ Create Account
                    </button>
                  </SignUpButton>

                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}