"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={
          open
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <>
          {/* OVERLAY */}
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={closeMenu}
            className="fixed inset-0 top-16 z-40 cursor-default bg-slate-950/20 backdrop-blur-[2px]"
          />

          {/* MENU */}
          <div className="absolute right-0 top-12 z-50 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">

            {/* HEADER */}
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                MediVerse
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Explore your learning space
              </p>
            </div>

            {/* NAVIGATION */}
            <nav className="p-2">
              <Link
                href="/learn/programs"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <span className="text-lg">📚</span>
                Programs
              </Link>

              <Link
                href="/learn/search"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <span className="text-lg">🔎</span>
                Search
              </Link>

              {isSignedIn && (
                <>
                  <div className="my-2 border-t border-slate-100" />

                  <Link
                    href="/learn"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700"
                  >
                    <span className="text-lg">🎯</span>
                    Continue Learning
                  </Link>
                </>
              )}
            </nav>

            {/* ACCOUNT */}
            <div className="border-t border-slate-100 p-4">
              {!isLoaded ? (
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
              ) : isSignedIn ? (
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Your Account
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Manage your profile
                    </p>
                  </div>

                  <UserButton />
                </div>
              ) : (
                <div className="space-y-2">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600"
                    >
                      Create Account
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}