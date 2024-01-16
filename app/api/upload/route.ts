import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const POST = async (req: Request) => {

  /// on récupère le nom du fichier
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");

  // écriture du fichier :
  try {
    if (req && req.body && filename) {
            const blob = await put(filename, req.body, {
      access: "public",
    });
    return NextResponse.json(blob);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};


