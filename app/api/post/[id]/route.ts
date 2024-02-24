import { prismaClient } from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const post = await prismaClient.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          message: "Not exist post",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        massage: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
