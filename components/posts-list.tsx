import { Post } from "@/types"
import PostCard from "./post-card";

type Props = {
    items: Post[];
}

export default function PostsList({items}:Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
      {items.map((post) => (
        <PostCard key={post.id} post={post}/>
      ))}
    </div>
  );
}
