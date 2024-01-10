"use client";

import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/utils/categories";
import { POSTS } from "@/utils/posts";
import { Category } from "@/types";
import Link from "next/link";
import PostsList from "@/components/posts-list";

export default function Home() {
  return (
    <PageContainer>
      <div>
        {/* landing */}
        <section className="h-[100%] text-center bg-[url('/img/coding.jpg')] bg-cover min-h-[400px] m-5 rounded-ld flex flex-col items-center justify-center">
          <h1 className=" sm:max-w-xl font-bold  text-[4rem]">
            Become a better SoftWare Engineer
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
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
          {CATEGORIES.map((category: Category) => (
            <Link key={category.id} href={`/categories/${category.slug} `}>
              <Button variant={"outline"}> {category.name}</Button>
            </Link>
          ))}
        </div>

        {/* cartes */}
        <PostsList items={POSTS} />

       
      </div>
    </PageContainer>
  );
}
