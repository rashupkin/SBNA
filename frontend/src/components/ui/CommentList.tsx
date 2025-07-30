import { IComment } from "@/types/IComment";
import { format } from "date-fns";
import { FC } from "react";

interface ICommentsList {
  comments: IComment[];
}

export const CommentsList: FC<ICommentsList> = ({ comments }) => {
  return (
    <ul className="space-y-6 mt-5">
      {comments.map((comment) => (
        <li key={comment.id} className="border p-4 rounded-lg shadow-sm">
          <div className="flex items-center text-gray-400 justify-between mb-2">
            <span className="font-medium">{comment.author.username}</span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(comment.createdAt), "dd.MM.yyyy HH:mm")}
            </span>
          </div>
          <p className="whitespace-pre-line">{comment.text}</p>
        </li>
      ))}
    </ul>
  );
};
