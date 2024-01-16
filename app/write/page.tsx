"use client";
import axios from "axios";
import { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/ui/page-title";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMutation } from "react-query";
import { Post } from "@prisma/client";
import { slugify } from "@/lib/slugidy";
import { cpSync } from "fs";
import { Divide} from "lucide-react";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

/////////  Pour vercel blob storing 
import type { PutBlobResult } from "@vercel/blob";
 

/**
 * Component where to write a new post
 */
export default function WritePage() {
  const { data: categories, isFetching } = useCategories();
  const session = useSession();
  const router = useRouter();

  //if (session.status !== "authenticated") router.replace("./login");
  useEffect(() => {
    if (!session) {
      router.replace("/login");
      return;
    }
  }, [router, session]);


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

  /// handle image upload
  /// nécessite 2 states : le file et un objet "url"
  const [file, setFile] = useState<File | null>(null);
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);

  const handleImageChange = (e: SyntheticEvent) => {
    // recupératon des files de l'input
    const files = (e.target as HTMLInputElement).files;
    // si pas de fichier on fait rien
    if (!files || !files[0]) return;
    // sinon on set File et son url
    setFile(files[0]);
    setImageObjectUrl(URL.createObjectURL(files[0])); // on créé l'url du file pour affichage
  };


  ///////  upload version locale //////////////////////////////////
  // const uploadImage = async () =>{
  //   try {
  //     if (!file) return;
  //     // le file va être envoyé à l'aide d'un fom-data
  //     const data =  new FormData();
  //     data.set("file", file)
  //     const response = await axios.post('/api/upload', data)
  //     return response.data /// url de l'image sur le serveur
      
  //   } catch (error) {
  //     console.log ("Error upload file", error)
  //   }
  // }


  ///////// upload version vercel ////////////////////////////////******************* */
  const uploadImage = async () => {
    try {
      if (!file) return;

      const response = await fetch (`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      const blob = (await response.json()) as PutBlobResult;

      console.log (blob)
       
      return blob.url  // on retourne l'url de la photo télé

    } catch (error) {
      console.log("Error upload file", error);
    }
  };
  ////////////////////////////////////////////////////////////////******************* */




  ///// post -> utilisation de react query
  const { mutate, isLoading } = useMutation(
    (newPost: Partial<Post>) => axios.post("/api/posts", newPost)
    .then((res)=> res.data),
    {
      onSuccess: (data : Post) =>  {

        router.push(`/posts/${data.slug}`)

       
      },
    }
  );

  const handlClick = async (e: SyntheticEvent) => {
    const { title, catSlug, content } = article;
    // toDo : verifier les values
    e.preventDefault();

    //const data = await uploadImage(); 
    const urlImg = await uploadImage(); 
   
    await mutate({
      title: title,
      content: content,
      userEmail: session?.data?.user?.email!,
      catSlug: catSlug,
      slug: slugify(title),
      //image: data.imageUrl || "/img/coding.jpg",
      image: urlImg || "/img/coding.jpg",         ///////// mofifie pour vercel
    });
  };




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
            onChange={(e) =>
              handleChange(e.target.name, e.target.value)
            }
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


          {/* image à upload */}
          { imageObjectUrl && 
          <div className="relative w-40 h-40 mx-auto">
              <Image src={imageObjectUrl} fill alt={article.title}></Image>
          </div>
          }
          <div>
            <Input
              className="mt-6"
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
          </div>


          {/* Content ReactQuill */}
          <ReactQuill
            className="mt-6"
            theme="snow"
            value={article.content}
            onChange={(value) => handleChange("content", value)}
          />
          <Button
            className=" mt-6 text-center p-auto"
            onClick={(e) => handlClick(e)}
          >
            {" "}
            Publier{" "}
          </Button>
        </div>
      </PageContainer>
    )
  );
}
