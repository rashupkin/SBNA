"use client";

import { CommentForm } from "@/components/forms/CommentForm";
import { IComment } from "@/types/IComment";
import { IPost } from "@/types/IPost";
import { request } from "@/utils/request";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CommentsList } from "@/components/ui/CommentList";
import { EditorButton } from "@/components/ui/EditorButton";
import Link from "next/link";
import { AxiosError, HttpStatusCode } from "axios";
import { pages } from "@/constants/pages";
import { Loader2 } from "lucide-react";
import { Loader } from "@/components/ui/Loader";

export default function PostPage() {
  const { slug } = useParams() as { slug: string };

  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await request({
          url: `/posts/${slug}`,
        });

        setPost(res?.data);
        setComments(res?.data.comments || []);
      } catch (error) {
        const err = error as AxiosError;

        if (err.status === HttpStatusCode.NotFound) {
          return router.push(pages.notFound);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading || !post) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <EditorButton />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="text-sm text-muted-foreground mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>
          Author:{" "}
          <Link
            href={`/profiles/${post.author.username}`}
            className="font-medium"
          >
            {post.author.username}
          </Link>
        </span>
        <span>
          Created: {format(new Date(post.createdAt), "dd.MM.yyyy")} | Updated:{" "}
          {format(new Date(post.updatedAt), "dd.MM.yyyy")}
        </span>
      </div>

      <p className="text-lg leading-7 dark:text-gray-200 text-black whitespace-pre-line">
        {post.description}
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <CommentForm
          slug={slug}
          onCommentAdded={(newComment) =>
            setComments((prev) => [...prev, newComment])
          }
        />

        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet.</p>
        ) : (
          <CommentsList comments={comments} />
        )}
      </section>
    </div>
  );
}
