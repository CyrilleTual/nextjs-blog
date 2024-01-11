import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { POSTS } from "../../../../utils/posts";
import { Post } from "@prisma/client";

type Params = {
  params: { slug: string };
};

export const GET = async (req: Request, { params }: Params) => {
  const { slug } = params;
  try {
    
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      }
    });
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

export const POST = async () => {
  
  const arrayToInsert  : any= [];

  POSTS.map((elet) => {
    let toInsert = {
      title: elet.slug,
      slug: elet.slug,
      content: elet.content,
      image: elet.image,
      view: elet.nbViews,
      nbComments: elet.nbComments,
    };
    arrayToInsert.push(toInsert);
  });

 

  try {
    // rem post : mane of the field in the Db
    const post = await prisma.post.createMany({
      data:arrayToInsert,
      skipDuplicates: true, // Skip 'Bobo'
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 500 }
    ); /// internal server error
  }

  //const result = POSTS.filter((post) => post.id === +params.slug);
};