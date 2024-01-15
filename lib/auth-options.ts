 
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
 
import { PrismaAdapter } from "@auth/prisma-adapter";
 

import prisma from "@/lib/connect"

 
//import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

//const prisma = new PrismaClient();

export const authOptions = {
  //adapter: PrismaAdapter(prisma),
  adapter: PrismaAdapter(prisma) as any,

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    /// pour utiliser les methodes d'autentification proposées par github etc...
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

// pour securiser les routes au niveau du backend

export const getAuthSession = () => getServerSession(authOptions);