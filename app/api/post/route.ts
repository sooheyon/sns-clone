import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//http://localhost:3000/api/post
export const POST = async (request: NextRequest) => {
  try {
    const { content, postId } = await request.json();
    const session = await getServerSession(authOptions);

    if (!content) {
      return NextResponse.json(
        {
          message: "Not exist content",
        },
        {
          status: 400,
        }
      );
    }

    if (!session) {
      return NextResponse.json(
        {
          message: "Not exist session",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prismaClient.post.upsert({
      where: {
        id: postId,
      },
      create: {
        content,
        userId: session.user.id,
      },
      update: {
        content,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
};

// 모든 글 내용을 조회
// 로그인 필요 없음
export const GET = async (request: NextRequest) => {
  try {
    // localhost:3000/api/post/10
    // localhost:3000/api/post?page=10 쿼리스트링
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page || isNaN(+page)) {
      return NextResponse.json(
        {
          message: "Not exist page",
        },
        {
          status: 400,
        }
      );
    }

    const COUNT = 10;

    const posts = await prismaClient.post.findMany({
      where: {
        NOT: {
          content: null,
        },
      },
      skip: (+page - 1) * COUNT,
      take: COUNT,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        // select와 차이
        user: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
};
