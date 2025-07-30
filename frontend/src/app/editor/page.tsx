"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pages } from "@/constants/pages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { request } from "@/utils/request";

const editorSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10),
});

export default function EditorPage() {
  const form = useForm<z.infer<typeof editorSchema>>({
    resolver: zodResolver(editorSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Interesting title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cool description for your article"
                    {...field}
                    className="resize-none h-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Post</Button>
        </form>
      </Form>
    </div>
  );
}
