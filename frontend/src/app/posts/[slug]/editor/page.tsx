"use client";

import { EditorForm, editorSchema } from "@/components/forms/EditorForm";
import { IPost } from "@/types/IPost";
import { request } from "@/utils/request";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";

export default function EditorPostPage() {
  const { slug } = useParams() as { slug: string };
  const [postData, setPostData] = useState<IPost | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await request({
        url: `/posts/${slug}`,
      });

      setPostData(res.data);
    })();
  }, []);

  const onSubmit = async (values: z.infer<typeof editorSchema>) => {
    const res = await request({
      method: "PUT",
      url: `/posts/${slug}`,
      data: values,
    });

    if (res && res.status === axios.HttpStatusCode.Ok)
      router.replace(`/posts/${slug}`);
  };

  return postData ? (
    <div className="max-w-5xl mx-auto pt-10">
      <EditorForm
        onSubmit={onSubmit}
        title={postData?.title}
        description={postData?.description}
      />
    </div>
  ) : (
    <div className="text-center py-10 text-muted-foreground">Loading...</div>
  );
}
