import { PostsList } from "./PostsList";
import { SkeletonPostCard } from "@/components/ui/SkeeletonPostCard";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/IUser";
import { FC } from "react";
import { ProfileCard } from "./ProfileCard";

interface IProfileProps {
  isLoading: boolean;
  profile: IUser | null;
  isVisibleButton?: boolean;
}

export const Profile: FC<IProfileProps> = ({
  isLoading,
  profile,
  isVisibleButton = false,
}) => {
  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => <SkeletonPostCard key={i} />);

  const hasPosts = !profile?.posts?.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {isLoading ? (
          <div
            className={cn(
              "space-y-6 duration-300",
              isLoading ? "opacity-100" : "opacity-0"
            )}
          >
            {renderSkeletons()}
          </div>
        ) : hasPosts ? (
          <p className="text-muted-foreground">
            You don&apos;t have any posts.
          </p>
        ) : (
          <PostsList
            posts={profile?.posts || []}
            isVisibleButton={isVisibleButton}
          />
        )}
      </div>

      <ProfileCard username={profile?.username} isLoading={isLoading} />
    </div>
  );
};
