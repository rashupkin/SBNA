"use client";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { request } from "@/utils/request";
import { FC } from "react";
import axios from "axios";
import { IComment } from "@/types/IComment";

interface ICommentFormProps {
  slug: string;
  onCommentAdded: (comment: IComment) => void;
}

const createCommentSchema = z.object({
  text: z.string().min(3).max(500),
});

export const CommentForm: FC<ICommentFormProps> = ({
  slug,
  onCommentAdded,
}) => {
  const form = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createCommentSchema>) => {
    const res = await request({
      method: "POST",
      url: `/posts/${slug}/comments`,
      data: values,
    });

    form.reset();

    if (res && res.status === axios.HttpStatusCode.Created) {
      onCommentAdded(res.data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <Textarea
                className="resize-none mb-5"
                placeholder="Write new comment..."
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button>Post</Button>
        </div>
      </form>
    </Form>
  );
};
