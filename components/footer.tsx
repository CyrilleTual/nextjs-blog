"use client"
import React from 'react'
import PageContainer from './page-container'
import { Category } from '@prisma/client';
import Link from 'next/link';
import { Button } from './ui/button';
import { useCategories } from '@/hooks/useCategories';

export default function Footer() {

  const { data: CATEGORIES } = useCategories(); 

  return (
    <footer className="p-4 border-t">
      <PageContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to bg-blue-600">
            NextBlog
          </p>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            {CATEGORIES?.map((category: Category) => (
              <Link key={category.id} href={`/categories/${category.slug} `}>
                <Button variant={"ghost"}> {category.title}</Button>
              </Link>
            ))}
            <Button variant={"ghost"}>
              <Link href={"./write"}>Write a post</Link>
            </Button>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
