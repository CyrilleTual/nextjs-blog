import { Post } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { badgeVariants } from "@/components/ui/badge";

import { MessageCircle, Eye } from "lucide-react";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Card className="flex flex-col justify-between rounded-lg h-[100%] ">
      {/* <Link href={`/posts/${post.slug}`} >  */}
      <Link
        href={{
          pathname: `/posts/${post.slug}`,
        }}
      >
        <CardHeader>
          <div className="aspect-square relative">
            <Image
              src={"/img/coding.jpg"}
              alt="post.title"
              fill
              className="aspact-sqauare object-cover transition-all duration-300 hover:scale-110 rounded-md"
            />
          </div>

          <h2>{post.title}</h2>
        </CardHeader>

        <CardFooter className="flex flex-row align-middle justify-evenly">
          <Link
            className={` ${badgeVariants({ variant: "outline" })} !p-2`}
            href={`/categories/${post.category.toLowerCase()}`}
          >
            {post.category}
          </Link>
          <div className="flex flex-row">
            <MessageCircle className="mr-2" /> {post.nbComments}
          </div>
          <div className="flex flex-row">
            <Eye className="mr-2" /> {post.nbViews}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
