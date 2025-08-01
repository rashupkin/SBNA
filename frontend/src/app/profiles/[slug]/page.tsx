"use client";

import { Profile } from "@/components/ui/Profile";
import { IUser } from "@/types/IUser";
import { request } from "@/utils/request";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { slug } = useParams() as { slug: string };

  const [profile, setProfile] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await request({
        url: `/users/${slug}`,
      });

      setProfile(res?.data);
      setIsLoading(false);

      setTimeout(() => setShowSkeleton(false), 300);
    })();
  }, []);

  return (
    <Profile
      profile={profile}
      isLoading={isLoading}
      showSkeleton={showSkeleton}
    />
  );
}
