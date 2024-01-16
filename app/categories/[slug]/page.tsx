"use client";
import PageContainer from "@/components/page-container";
import PostCard from "@/components/post-card";
import PageTitle from "@/components/ui/page-title";
import { usePostsByCategory } from "@/hooks/usePosts";
import { PostWithCategory } from "@/types";



type Params = {
  params: {
    slug: string;
  };
};

export default function Caterorypage({ params }: Params) {
  const { slug } = params;

  const {
    data,
    isSuccess,
  } = usePostsByCategory(slug);

  // Explicitly typing items as Post[]
  const items: PostWithCategory[] | undefined = data ;

  return (
    <>
      {items && (
        <PageContainer>
          <PageTitle title={slug.charAt(0).toUpperCase() + slug.slice(1)} />
          {isSuccess && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
              {items.map((post: PostWithCategory) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </PageContainer>
      )}
    </>
  );
}
