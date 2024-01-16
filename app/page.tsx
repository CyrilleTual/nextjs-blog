"use client";
import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import PostsList from "@/components/posts-list";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@prisma/client";
import { blogTitle1, blogTitle2 } from "@/utils/constants";



 
 

export default function Home() {

  // immportations des posts 

  const { data: items, isFetching, error, isSuccess } = usePosts();
  const { data: categories, isSuccess: categoriesSuccess} = useCategories(); 
      
  return (
    <PageContainer>
      <div>
        {/* landing */}
        <section className="h-[100%] text-center bg-[url('/img/coding.jpg')] bg-cover min-h-[400px] m-5 rounded-ld flex flex-col items-center justify-center">
          <h1 className=" sm:max-w-xl font-bold  text-[4rem]">
            {blogTitle1} {blogTitle2}
          </h1>
          <Input
            className="bg-slate-50 max-w-[90%]"
            type="email "
            placeholder="Email"
          />
          <Button className="mt-4 w-[90%] text-lg">
            Subscribe to our Newsletter
          </Button>
        </section>

        {/* boutons de nav */}
        {categoriesSuccess && (
          <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
            {categories.map((category: Category) => (
              <Link key={category.id} href={`/categories/${category.slug} `}>
                <Button variant={"outline"}> {category.title}</Button>
              </Link>
            ))}
          </div>
        )}

        {/* cartes */}
        <PostsList items={items} />
      </div>
    </PageContainer>
  );
}
