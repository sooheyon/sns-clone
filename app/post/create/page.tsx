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

const PostCreate: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [content, setContent] = useState<string>();

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmitCreate = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!content || !session) return;

      console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post`,
        {
          content,
        }
      );

      if (response.status !== 200) return;

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) return;

    router.replace("/");
  }, [session]);

  return (
    <div >
      <form className="flex flex-col p-4" onSubmit={onSubmitCreate}>
        <textarea className="input-style h-96 resize-none" value={content} onChange={onChangeContent} />
        <input className="btn-style w-full mt-2 self-end" type="submit" value="글 생성" />
      </form>
    </div>
  );
};

export default PostCreate;
