import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { getAuthSession } from "@/lib/auth-options";
import { headers } from "next/headers";
import { Post } from "@prisma/client";

/**
 * Post d'un nouveau commentaire
 */
export const POST = async (req: Request) => {
  const session = await getAuthSession();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 403 });
  }
  // recupération des données du commentaire
  try {
    // recupération des données du post
    const body = await req.json();

    // requete vers la database avec prisma
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    // retour de la requète
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 500 }
    ); /// internal server error
  }
};

// recupération de tous les commentaire pour un post
export const GET = async (req: Request) => {
  // on recupère le searchparameter
  // transformation d'une string en objet
  const url = new URL(req.url);
  const postSlug = url.searchParams.get("postSlug");

  try {
    if (!postSlug) {
      return NextResponse.json(
        { error: "Something went wrong!" },
        { status: 500 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        postSlug: postSlug,
      },
      include: {user: true}
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
      },
      { status: 500 }
    ); /// internal server error
  }
};
