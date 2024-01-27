import { IPost } from "@/types";
import React, { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div>
      <div>{post.user.name}</div>
      <div>{post.content}</div>
      <div>
        {formatDistanceToNow(new Date(post.createdAt), {
          locale: ko,
          addSuffix: true,
        })} 
      </div>
    </div>
  );
};

export default PostCard;
