"use client";
import PageContainer from "@/components/page-container";
import PostCard from "@/components/post-card";
import PageTitle from "@/components/ui/page-title";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import { Post } from "@prisma/client";

type Params = {
  params: {
    slug: string;
  };
};
type PostsData = Post[];

export default function Caterorypage({ params }: Params) {
  const { slug } = params;


  //// Methode 1 on recupère tous les posts et on les trie ensuite
  const { data: POSTS , isFetching, error, isSuccess } = usePosts();
  const [items, setItems] = useState<PostsData | undefined>();
  useEffect(() => {
    if (isSuccess) {
      setItems(POSTS.filter((post:Post) => post.catSlug === slug));
    }
  }, [isSuccess, POSTS, slug]);

  /// methode 2 -> requête pour ne recupérer que les posts utiles 



  return (
    <>
      {items && (
        <PageContainer>
          <PageTitle title={ slug.charAt(0).toUpperCase() + slug.slice(1)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
            {items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </PageContainer>
      )}
    </>
  );
}
