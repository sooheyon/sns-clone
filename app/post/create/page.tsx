"use client";

import {
  ChangeEvent,
  FormEvent,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import Image from "next/image";

const PostCreate: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [content, setContent] = useState<string>();
  const [post, setPost] = useState<Post>();
  const [image, setImage] = useState<string>();

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmitCreate = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!content || !session) return;

      console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post`,
        {
          content,
          postId: post?.id
        }
      );

      if (response.status !== 200) return;

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;

      const formData = new FormData();
      formData.append("imageFile", e.target.files[0]);

      const postResponse = await axios.post<Post>(
        `${process.env.NEXT_PUBLIC_URL}/api/post/image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(postResponse);
      setPost(postResponse.data);

      const getResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/post/image?image-file-name=${postResponse.data.image}`
      );

      setImage(getResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) return;

    router.replace("/");
  }, [session]);

  return (
    <div>
      <form className="flex flex-col p-4" onSubmit={onSubmitCreate}>
        <textarea
          className="input-style h-96 resize-none"
          value={content}
          onChange={onChangeContent}
        />
        {image && (
          <div className="image-style">
            <Image className="object-cover" src={image} alt="preview" fill />
          </div>
        )}
        <div className="mt-2 self-end">
          <label className="btn-style" htmlFor="uploadImage">
            이미지
          </label>
          <input
            id="uploadImage"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={onUploadImage}
          />
          <input
            className="btn-style w-fit ml-2"
            type="submit"
            value="글 생성"
          />
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
