"use client";

import { EditorButton } from "@/components/ui/EditorButton";
import { PostsList } from "@/components/ui/PostsList";
import { SkeletonPostCard } from "@/components/ui/SkeeletonPostCard";
import { cn } from "@/lib/utils";
import { IPost } from "@/types/IPost";
import { request } from "@/utils/request";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogHomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const goToPage = (newPage: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", String(newPage));
    router.push("?" + query.toString());
  };

  useEffect(() => {
    (async () => {
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      query.set("page", String(page));
      query.set("limit", String(limit));

      const res = await request({
        url: `/posts?${query.toString()}`,
      });

      setPosts(res.data ?? []);
      setIsLoading(false);

      setTimeout(() => setShowSkeleton(false), 300);
    })();
  }, [search, page, limit]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4">
      <EditorButton />
      <div className="max-w-4xl mx-auto space-y-6">
        {showSkeleton ? (
          <div
            className={cn(
              "space-y-6 duration-300",
              isLoading ? "opacity-100" : "opacity-0"
            )}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonPostCard key={i} />
            ))}
          </div>
        ) : posts.length ? (
          <>
            <PostsList posts={posts} />
            <div className="flex justify-center gap-4 mt-6">
              <button
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                ← Prev
              </button>
              <button
                onClick={() => goToPage(page + 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-4xl text-gray-400 text-center mt-10">
            None posts
          </h1>
        )}
      </div>
    </main>
  );
}
