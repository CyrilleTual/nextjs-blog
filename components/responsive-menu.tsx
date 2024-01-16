"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
//import { CATEGORIES } from "@/utils/categories";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ResponsiveMenu() {
  const [open, setOpen] = useState(false);
  const { data: categories, isSuccess: categoriesSuccess } = useCategories(); 

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className="h-6 w-6 md:hidden" />
        </SheetTrigger>
        <div onClick={() => setOpen(false)}>
          <SheetContent side="left" className="w-[300px]">
            <div className="flex flex-col gap-4">
              <Link href="/write">
                <Button className=" px-2 py-2 text-lg" variant={"ghost"}>
                  Write a post
                </Button>
              </Link>
              <p>Catégories</p>

              {categories && categories.map((categorie: Category) => (
                <Link
                  key={categorie.id}
                  className="block  px-2 py-2 text-lg"
                  href={`/categories/${categorie.slug}`}
                >
                  <Button className=" px-2 py-2 text-lg" variant={"ghost"}>
                    {categorie.title}
                  </Button>
                </Link>
              ))}
            </div>
          </SheetContent>
        </div>
      </Sheet>
    </>
  );
}
