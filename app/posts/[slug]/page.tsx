import { Post } from "@/types";
import PostCard from "@/components/post-card";
 
import { POSTS } from "@/utils/posts";

type Params = {
  params: {
    slug: string;
  };
};


export default function Postspage({ params }: Params) {
  // on recupère les posts que l'on filter selon le slug

  const items = POSTS.filter(
    (post) => post.slug === params.slug
  );

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
      {items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
