"use client";

import { EditorForm, editorSchema } from "@/components/forms/EditorForm";
import { Loader } from "@/components/ui/Loader";
import { pages } from "@/constants/pages";
import { IPost } from "@/types/IPost";
import { request } from "@/utils/request";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";

export default function EditorPostPage() {
  const { slug } = useParams() as { slug: string };

  const [postData, setPostData] = useState<IPost | null>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await request({
          url: `/posts/${slug}`,
        });

        setPostData(res.data);
      } catch (error) {
        const err = error as AxiosError;

        if (err.status === HttpStatusCode.NotFound) {
          return router.push(pages.notFound);
        }
      }
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
    <Loader />
  );
}
