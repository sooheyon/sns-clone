import { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { IComment } from "@/types";

interface CommentCardProps {
  comment: IComment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  return (
    <li className="flex justify-between gap-2">
      <div>
        <span className="font-bold">{comment.user.name}</span>
        <span className="ml-1">
          #{comment.userId.substring(comment.userId.length - 4)}
        </span>
        <span className="ml-2">{comment.content}</span>
      </div>
      <div>
        <span className="ml-2">
          {formatDistanceToNow(new Date(comment.createdAt), { locale: ko })}
        </span>
      </div>
    </li>
  );
};

export default CommentCard;
