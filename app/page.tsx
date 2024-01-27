"use client";

import { IPost } from "@/types";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

const Home: NextPage = () => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    try {
      const response = await axios.get<IPost[]>(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/post?page=1`
      );

      setPage((prev) => prev + 1);
      setPosts((prev) => [...posts, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className="bg-red-100 grow">
      <div className="p-4 flex flex-col gap-4">
        {posts.map((v, i) => (
          <PostCard key={i} post={v} />
        ))}
      </div>
    </div>
  );
};

export default Home;
