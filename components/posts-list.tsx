import { PostWithCategory } from "@/types";
import PostCard from "./post-card";
 
type Props = {
  items: PostWithCategory[];
};

export default function PostsList({ items }: Props) {
  return (
    items && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        {items.map((post: PostWithCategory) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    )
  );
}
