import { Prisma } from "@prisma/client"


//// pour pouvoir utiliser sans db si besoin
export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Post = {
  id: number;
  category: string;
  title: string;
  image: string;
  caption: string;
  date: string | Date;
  minutesToRead: number;
  author: string;
  nbViews: number;
  nbComments: number;
  slug: string;
  content: string;
};

// nouveau type crée car on recupère les données de 2 tables 
export type PostWithCategory  = Prisma.PostGetPayload<{
  include: { cat: true}; 
}>

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: { user: true};
}>