"use client";
import axios from "axios";
import React, { SyntheticEvent } from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation , QueryClient} from "react-query";
import { Comment } from "@prisma/client";
import { useComments } from "@/hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentWithUser } from "@/types";

export function ButtonDemo() {
  return <Button>Button</Button>;
}

export default function Comments({ postSlug }: { postSlug: string }) {
  // info de la session pour autoriser commentaires et ratacher commentaire à l'auteur
  const { data: session, status } = useSession();


  // recupération des commentaires pour le post
  const { data : comments, isLoading : isLoadingComments, isError } =   useComments(postSlug)

  /// on fait le post vers le back
  const queryClient = new QueryClient();
  const [content, setContent] = useState<string>("");



  const { mutate, isLoading } = useMutation((newComment: Partial<Comment>) =>
    axios.post("/api/comments", newComment).then(() => {
      queryClient.invalidateQueries("comments"); // pour mettre à jour le cache
    }),{
      onSuccess : () => {
        console.log ("succes")
      }
    }
  );


  const addComment = async (e: SyntheticEvent) => {
    if (!session || !session.user || status !== "authenticated") return;
    e.preventDefault();
    await mutate({
      content: content,
      postSlug: postSlug,
    });
  };



  return (
    <div className="mt-10">
      <Separator />
      <h2 className="test-2xl text-slate-500 font-semibold mt-4">
        Commentaires
      </h2>

      {/* affichage des commentaites existants */}
      { comments && (
        comments.map((comment : CommentWithUser)=>
        <div key={comment.id} className='flex items-center my-3' >
          <Avatar>
            <AvatarImage src={comment.user.image || "/img/default-avatar.jpg"}></AvatarImage>
            <AvatarFallback>{comment.user.name}</AvatarFallback>
          </Avatar>
          <div className="ml-3 p-4 border rounded-lg w-[100%]">
            <div className="text-slate-500 text-sm">
               <span>Posté par :  {comment.user.name} </span> <span>le {(new Date(comment.createdAt)).toLocaleDateString()}</span>
            </div>
           
             <p>{comment.content}</p>
          </div>

         
        </div>
        )
      )}

      {/* saisie d'un nouveau commentaire  */}
      {status === "authenticated" ? (
        <div className="mt-2 mb-6">
          <div className="grid w-full gap-2">
            <form></form>
            <Textarea
              name="comment"
              placeholder="Type your message here."
              onChange={(e) => setContent(e.target.value)}
            />
            <Button disabled={content === ""} onClick={addComment}>
              Send message
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-2 mb-6 mx-auto ">
          <Link className="text-decoration-line: underline " href={"/login"}>
            Je m&apos;identifie pour pouvoir laisser un commentaire
          </Link>
        </div>
      )}
    </div>
  );
}
