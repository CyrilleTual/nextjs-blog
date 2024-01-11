 "use client"
 

import { MessageCircle, Eye } from "lucide-react";
import PageContainer from "@/components/page-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/hooks/usePost";



type Params = {
  params: {
    slug: string;
  };
};

export default function Postspage({ params }: Params) {

  const {slug} = params;
  const {data: post, isFetching, error, isSuccess} = usePost(slug);

  return (
    <PageContainer>
      {isSuccess && 
            <article>
        <div className="h-[100%] text-center bg-[url('/img/coding.jpg')] bg-cover min-h-[400px] m-5 rounded-lg flex flex-col items-center justify-center">
          <div className="bg-black bg-opacity-20 mx-10 rounded-xl">
            <h1 className=" l:max-w-ml font-bold  text-[4rem]">{post.title}</h1>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-3">
          <div className="flex flex-row items-center justify-center gap-3 ">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-green-700">
                {/* {post.author.substring(0, 1)} */}
              </AvatarFallback>
            </Avatar>

            {/* <div className="bg-green-700 text-white p-3 rounded-full m-2">
              {post.author.substring(0, 1)}
            </div> */}
            <div>
              {/* <div>{post.author}</div> */}
              {post?.createdAt &&
                           <div className="text-slate-500 text-sm">
                Posted on : {new Date(post.createdAt).toLocaleDateString()}
              </div>
              }
            </div>
          </div>

          <div className="flex flex-row ">
            <div className="flex flex-row ">
              <MessageCircle className="mr-2" /> {post?.nbComments}
            </div>
            <div className="flex flex-row mx-6">
              <Eye className="mr-2" /> {post?.view}
            </div>
          </div>
        </div>
        <div className="m-3">
          <Separator />
          {/* fonctionne mais ne permet pas de mise en page */}
          {/* <p className="my-5">{post.content || ""}</p> */}

          {/* Pour  pourvoir exploiter une mise en page en inserant du htmt */}
          <div 
            className="my-6"
            dangerouslySetInnerHTML={{
              __html: post?.content  || "",
            }}>
          </div>



          <Separator />
        </div>
      </article>
      }

    </PageContainer>
  );
}
