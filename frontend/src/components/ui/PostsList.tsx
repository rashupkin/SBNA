import { IPost } from "@/types/IPost";
import { Dispatch, FC, SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreVertical } from "lucide-react";
import { request } from "@/utils/request";
import { IUser } from "@/types/IUser";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface IPostsList {
  posts: IPost[];
  isVisibleButton?: boolean;
  setProfile?: Dispatch<SetStateAction<IUser | null>>;
}

export const PostsList: FC<IPostsList> = ({
  posts,
  isVisibleButton = false,
  setProfile,
}) => {
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    await request({
      method: "DELETE",
      url: `/posts/${postId}`,
    });

    if (setProfile)
      setProfile((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          posts: prev.posts.filter((post) => post.id !== postId),
        };
      });
  };

  const handleEdit = async (postId: string) => {
    router.replace(`/posts/${postId}/editor`);
  };

  return (
    <ul className="grid gap-8">
      {posts.map((post, index) => (
        <motion.li
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <Card className="relative bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] hover:shadow-md dark:hover:shadow-lg transition-all">
            {isVisibleButton && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreVertical size={"20"} className="absolute right-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(post.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(post.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link href={`/posts/${post.id}`}>
              <CardContent className="p-6 space-y-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                  {post.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                  {post.description}
                </p>
                {post.author && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Author: {post.author.username}
                  </p>
                )}
              </CardContent>
            </Link>
          </Card>
        </motion.li>
      ))}
    </ul>
  );
};
