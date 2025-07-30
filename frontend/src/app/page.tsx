"use client";

import { EditorButton } from "@/components/ui/EditorButton";
import { PostsList } from "@/components/ui/PostsList";
import { SkeletonPostCard } from "@/components/ui/SkeeletonPostCard";
import { cn } from "@/lib/utils";
import { IPost } from "@/types/IPost";
import { request } from "@/utils/request";
import { useEffect, useState } from "react";

export default function BlogHomePage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await request({
        url: "/posts",
      });

      setPosts(res.data ?? []);
      setIsLoading(false);

      setTimeout(() => setShowSkeleton(false), 300);
    })();
  }, []);

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
          <PostsList posts={posts} />
        ) : (
          <h1 className="text-4xl text-gray-400 text-center mt-10">
            None posts
          </h1>
        )}
      </div>
    </main>
  );
}
