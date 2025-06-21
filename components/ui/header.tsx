"use client";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="fixed top-2 left-0 right-0 z-50 w-full md:top-3">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Removed all transparent backgrounds and blur effects */}
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900 px-3 border border-gray-700">
          
          {/* Site branding */}
          <div className="flex flex-1 items-center gap-2">
            <Logo />
            <span className="text-white text-lg font-semibold tracking-widest">
              VISIBLY
            </span>
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/signin"
                className="btn-sm py-[5px] text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 transition-colors"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="btn-sm py-[5px] text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg px-4 transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </header>
  );
}