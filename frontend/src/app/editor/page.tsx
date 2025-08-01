"use client";

import { pages } from "@/constants/pages";
import z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { request } from "@/utils/request";
import { EditorForm, editorSchema } from "@/components/forms/EditorForm";

export default function EditorPage() {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof editorSchema>) => {
    const res = await request({
      method: "POST",
      url: "/posts",
      data: values,
    });

    if (res && res.status === axios.HttpStatusCode.Created)
      router.replace(pages.main);
  };

  return (
    <div className="max-w-5xl mx-auto pt-10">
      <EditorForm onSubmit={onSubmit} />
    </div>
  );
}
