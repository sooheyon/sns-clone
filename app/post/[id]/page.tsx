"use client";

import CommentCard from "@/app/components/CommentCard";
import CreateCommentForm from "@/app/components/CreateCommentForm";
import PostCard from "@/app/components/PostCard";
import { IComment, IPost } from "@/types";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const PostDetail: NextPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  const [content, setContent] = useState<string>(""); //comment content
  const [comments, setComments] = useState<IComment[]>([]);

  const { data: session } = useSession();

  const getPost = async () => {
    try {
      const response = await axios.get<IPost>(
        `${process.env.NEXT_PUBLIC_URL}/api/post/${id}`
      );

      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get<IComment[]>(
        `${process.env.NEXT_PUBLIC_URL}/api/comment?postId=${id}`
      );

      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitCreateComment = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!content || !post) return;

      const response = await axios.post<IComment>(
        `${process.env.NEXT_PUBLIC_URL}/api/comment`,
        {
          content,
          postId: id,
        }
      );

      setComments([response.data, ...comments]);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const commentsMap = comments.map((comm, idx) => {
    return <CommentCard key={comm.id} comment={comm} />;
  });

  return (
    <div>
      {post && <PostCard post={post} />}
      <CreateCommentForm
        onSubmitCreateComment={onSubmitCreateComment}
        content={content}
        setContent={setContent}
      />
      <ul className="mt-8">{commentsMap}</ul>
    </div>
  );
};

export default PostDetail;
