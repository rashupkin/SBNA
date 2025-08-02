"use client";

import { EditorButton } from "@/components/ui/EditorButton";
import { Profile } from "@/components/ui/Profile";
import { pages } from "@/constants/pages";
import { IUser } from "@/types/IUser";
import { request } from "@/utils/request";
import { AxiosError, HttpStatusCode } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { slug } = useParams() as { slug: string };

  const [profile, setProfile] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await request({
          url: `/users/${slug}`,
        });

        setProfile(res?.data);

        setTimeout(() => setIsLoading(false), 300);
      } catch (error) {
        const err = error as AxiosError;

        if (err.status === HttpStatusCode.NotFound) {
          return router.push(pages.notFound);
        }
      }
    })();
  }, []);

  return (
    <div>
      <EditorButton />
      <Profile profile={profile} isLoading={isLoading} />
    </div>
  );
}
