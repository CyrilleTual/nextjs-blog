import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

export const GET = async (req: Request) => {
  // api/post[?cat="slug"]

  // const { searchParams } = new URL(req.url);
  // const catSlug = searchParams.get("cat");

  try {
    const post = await prisma.post.findMany({
      include: {
        cat: true
      }
    });

    // if (catSlug) {
    //   const filteredPost =  (
    //     post.filter((item)=>(
    //     item.catSlug===catSlug
    //   ))
    //   ) 
    //   return NextResponse.json(filteredPost, { status: 200 });

    // }else{
      return NextResponse.json(post, { status: 200 });
    //}

  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 500 }
    ); /// internal server error
  }
};
