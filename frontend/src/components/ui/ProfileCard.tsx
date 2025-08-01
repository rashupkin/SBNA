import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { FC } from "react";

interface IProfileCardProps {
  username?: string;
  isLoading: boolean;
}

export const ProfileCard: FC<IProfileCardProps> = ({ username, isLoading }) => {
  return (
    <div className="col-span-1 border rounded-lg p-6 text-center">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold">
          <span className="block text-sm mb-2 text-gray-500 font-light">
            Username:{" "}
          </span>
          {isLoading ? (
            <Skeleton
              className={cn(
                "h-4 w-[250px] duration-300",
                isLoading ? "opacity-100" : "opacity-0"
              )}
            />
          ) : (
            username
          )}
        </h2>
      </div>
    </div>
  );
};
