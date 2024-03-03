import { FC, FormEvent, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { IComment } from "@/types";
import CreateCommentForm from "./CreateCommentForm";
import axios from "axios";

interface CommentCardProps {
  comment: IComment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  console.log('[comment]',comment)

  const onSubmitCreateComment = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!content) return;

      const response = await axios.post<IComment>(
        `${process.env.NEXT_PUBLIC_URL}/api/comment/${comment.id}`,
        {
          content,
        }
      );

      setContent("");
      setIsOpen(false);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <li
        className="flex justify-between gap-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
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

      {isOpen && (
        <CreateCommentForm
          onSubmitCreateComment={onSubmitCreateComment}
          content={content}
          setContent={setContent}
        />
      )}
    </>
  );
};

export default CommentCard;
