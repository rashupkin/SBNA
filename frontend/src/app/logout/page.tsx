"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccessTokenStore } from "@/states/accessToken";
import { pages } from "@/constants/pages";
import { request } from "@/utils/request";

export default function LogoutPage() {
  const router = useRouter();
  const { setToken } = useAccessTokenStore();

  useEffect(() => {
    (async () => {
      try {
        await request({
          method: "POST",
          url: "/auth/logout",
        });
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        setToken(null);
        router.replace(pages.signIn);
      }
    })();
  }, [router, setToken]);

  return (
    <div className="flex justify-center items-center h-screen text-lg text-muted-foreground">
      Exiting from account...
    </div>
  );
}
