import PageContainer from "@/components/page-container";
import PostCard from "@/components/post-card";
import PageTitle from "@/components/ui/page-title";
import { POSTS } from "@/utils/posts";

type Params = {
  params: {
    slug: string;
  };
};

export default function Caterorypage({ params }: Params) {
 
  // en fonction du slug on retourne le nom de la catégorie (dans la db)
 const value = (() => {
   switch (params.slug) {
     case "react":
       return "React";
     case "react-native":
       return "React Native";
     case "nextjs":
       return "Next.js";
     case "css":
       return "CSS";
     case "javascript":
       return "JavaScript";
     default:
       return ""; // or any default value you want
   }
 })();
  

 // on filtre les posts
  const items = POSTS.filter((post) => post.category === value);

  return (
    <>
      {items && (
        <PageContainer>
          <PageTitle title={value} />
           
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
