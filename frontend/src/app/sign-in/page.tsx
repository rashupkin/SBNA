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
import { pages } from "@/constants/pages";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { request } from "@/utils/request";
import { useState } from "react";

const signInSchema = z.object({
  username: z.string().min(3).max(80),
  password: z.string().min(8).max(80),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const res = await request({
        method: "POST",
        url: "/auth/sign-in",
        data: values,
      });

      if (res.status === axios.HttpStatusCode.Ok) {
        router.replace(pages.main);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === axios.HttpStatusCode.BadRequest) {
          setServerError(err.response.data.message || "Invalid Data");
        } else {
          setServerError("Internal Error");
        }
      } else {
        setServerError("Unknown Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#111] rounded-xl shadow-md dark:shadow-black/60 transition-colors">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white transition-colors">
          Sign In
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 transition-colors mb-2">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      className="bg-gray-100 dark:bg-[#222] border-gray-300 dark:border-[#333] placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 transition-colors mb-2">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      className="bg-gray-100 dark:bg-[#222] border-gray-300 dark:border-[#333] placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {serverError && <p className="text-red-500">{serverError}</p>}

            <Link className="block mb-3" href={pages.signUp}>
              Don&apos;t have an account?
            </Link>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-[#333]"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-[#333]"></div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 flex items-center justify-center gap-2 text-gray-900 dark:text-white border-gray-300 dark:border-[#333] hover:bg-gray-100 dark:hover:bg-[#222] transition-colors cursor-pointer"
        >
          <FcGoogle />
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
