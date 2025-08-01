"use client";

import { pages } from "@/constants/pages";
import Link from "next/link";
import { ToggleThemeButton } from "../ui/ToggleThemeButton";
import { SearchForm } from "../forms/SearchForm";
import { ToggleProfileButton } from "../ui/ToggleProfileButton";

export const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 dark:border-[#333] bg-white dark:bg-black shadow-sm dark:shadow-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-50">
        <Link
          href={pages.main}
          className="text-2xl font-bold text-gray-900 dark:text-white transition-colors"
        >
          SBNA
        </Link>

        <SearchForm />

        <div className="flex items-center gap-5">
          <ToggleProfileButton />

          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
};
