import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { getAuthSession } from "@/lib/auth-options";
import { setEngine } from "crypto";

export const GET = async (req: Request) => {
  ////////////////////////////////////////////////////
  //// protection par auth de la route
  //const session = await getAuthSession();
  // if (!session || !session.user) {
  //  return NextResponse.json ({ message : "Not Authenticated"}, {status: 403})
  //}
  /////////////////////////////////////////////////////////////////////////

  // api/post[?cat="slug"]

  // const { searchParams } = new URL(req.url);
  // const catSlug = searchParams.get("cat");

  try {
    const post = await prisma.post.findMany({
      include: {
        cat: true,
      },
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

export const POST = async (req: Request, res: Response) => {
  ////////////////////////////////////////////////////
  //// protection par auth de la route
  const session = await getAuthSession();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 403 });
  }
  /////////////////////////////////////////////////////////////////////////

  // recupération des données du POST
  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
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
