import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

export const GET = async () => {
  try {
    const post = await prisma.post.findMany() ;
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 500 }
    ); /// internal server error
  }
};
