"use client";
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/ui/page-title";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";

 import ReactQuill from "react-quill";
 import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { json } from "stream/consumers";
import { useMutation } from "react-query";
import { Post } from "@prisma/client";
import { slugify } from "@/lib/slugidy";





export default function WritePage() {
  const { data: categories, isFetching } = useCategories();
  const session = useSession();
  const router = useRouter();
  // if (session.status !== "authenticated") router.replace("./login");

  type ArticleType = {
    title: string;
    catSlug: string;
    content: string;
  };

  const defaultValues = {
    title: "",
    catSlug: "",
    content: "",
  };

  const [article, setArticle] = useState<ArticleType>(defaultValues);

  const handleChange = (key: string, value: string) => {
    setArticle((article) => ({ ...article, [key]: value }));
  };

  ///// post -> utilisation de react query 
 const {mutate, isLoading}= useMutation((newPost: Partial<Post>) => axios.post("/api/posts", newPost),{
    onSuccess : data => {console.log ("sucess", data)}
  });

 
  const handlClick = async (e: SyntheticEvent) =>{
    const {title, catSlug, content} = article

    // toDo : verifier les values 

    e.preventDefault();
     await mutate({
       title: title,
       content: content,
       userEmail: session?.data?.user?.email! ,
       catSlug: catSlug,
       slug: slugify(title),
       image: "/img/coding.jpg"
     });
  }

  return (
    session.status && (
      <PageContainer>
        <div className="p-10">
          <PageTitle title={"Write a post"} />
          {/* Title */}
          <Input
            className="mb-6"
            type="text"
            name={"title"}
            value={article.title}
            placeholder="Donnez un titre à votre article "
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          {/* category */}
          <Select
            name="catSlug"
            onValueChange={(e) => handleChange("catSlug", e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            {isFetching ? (
              <SelectContent className="SelectContent">
                <p>Loading..</p>
              </SelectContent>
            ) : (
              <SelectContent className="SelectContent">
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            )}{" "}
          </Select>
          {/* Content ReactQuill */}
          <ReactQuill
          className="mt-6"
            theme="snow"
            value={article.content}
            onChange={(value) => handleChange("content", value)}
          />
          <Button className=" mt-6 text-center p-auto" onClick={(e)=>handlClick(e)}> Publier  </Button>
        </div>
      </PageContainer>
    )
  );
}
