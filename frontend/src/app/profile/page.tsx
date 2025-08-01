"use client";

import { Profile } from "@/components/ui/Profile";
import { IUser } from "@/types/IUser";
import { request } from "@/utils/request";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await request({
        url: "/users/me",
      });

      setProfile(res?.data);

      setTimeout(() => setIsLoading(false), 300);
    })();
  }, []);

  return (
    <Profile profile={profile} isLoading={isLoading} isVisibleButton={true} />
  );
}
