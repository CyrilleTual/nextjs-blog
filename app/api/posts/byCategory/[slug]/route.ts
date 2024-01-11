import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
type Params = {
  params: { slug: string };
};

export const GET = async (req: Request, { params }: Params) => {
  const { slug } = params;
  try {
    const posts = await prisma.post.findMany({
      where: { catSlug: slug },
      include: {
        cat: true,
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 500 }
    );
  }
};
