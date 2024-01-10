import React from 'react'
import PageContainer from './page-container'
import { CATEGORIES } from '@/utils/categories';
import { Category } from '@/types';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="p-4 border-t">
      <PageContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to bg-blue-600">
            NextBlog
          </p>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            {CATEGORIES.map((category: Category) => (
              <Link key={category.id} href={`/categories/${category.slug} `}>
                <Button variant={"ghost"}> {category.name}</Button>
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
