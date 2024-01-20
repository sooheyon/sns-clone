import { NextRequest, NextResponse } from "next/server";

//http://localhost:3000/api/post
export const POST = async (request: NextRequest) => {
  return NextResponse.json({
    message: "Hello",
  });
};
