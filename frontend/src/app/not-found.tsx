import { pages } from "@/constants/pages";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 animate-bounce">404</h1>
      <p className="text-2xl mt-4 text-gray-700 dark:text-gray-300">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href={pages.main}
        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
