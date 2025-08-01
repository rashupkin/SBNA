import { PostsList } from "./PostsList";
import { SkeletonPostCard } from "@/components/ui/SkeeletonPostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/IUser";
import { FC } from "react";

interface IProfileProps {
  showSkeleton: boolean;
  isLoading: boolean;
  profile: IUser | null;
  isVisibleButton?: boolean;
}

export const Profile: FC<IProfileProps> = ({
  showSkeleton,
  isLoading,
  profile,
  isVisibleButton = false,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {showSkeleton ? (
          <div
            className={cn(
              "space-y-6 duration-300",
              isLoading ? "opacity-100" : "opacity-0"
            )}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonPostCard key={i} />
            ))}
          </div>
        ) : !profile?.posts?.length ? (
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

      <div className="col-span-1 border rounded-lg p-6 text-center">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">
            <span className="block text-sm mb-2 text-gray-500 font-light">
              Username:{" "}
            </span>
            {showSkeleton ? (
              <Skeleton
                className={cn(
                  "h-4 w-[250px] duration-300",
                  isLoading ? "opacity-100" : "opacity-0"
                )}
              />
            ) : (
              profile?.username
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};
