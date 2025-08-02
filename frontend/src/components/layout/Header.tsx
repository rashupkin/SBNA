"use client";

import { pages } from "@/constants/pages";
import Link from "next/link";
import { ToggleThemeButton } from "../ui/ToggleThemeButton";
import { SearchForm } from "../forms/SearchForm";
import { ToggleProfileButton } from "../ui/ToggleProfileButton";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-6">
        <Link
          href={pages.main}
          className="text-3xl font-extrabold tracking-tight text-primary hover:opacity-90 transition-opacity"
        >
          SBNA
        </Link>

        <div className="hidden md:block flex-1">
          <SearchForm />
        </div>

        <div className="flex items-center gap-4">
          <ToggleProfileButton />
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
};
