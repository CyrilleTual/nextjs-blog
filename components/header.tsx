import React from "react";
import PageContainer from "./page-container";
import { HeaderNavigation } from "./header-navigation";
import ProfileButton from "./profile-button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <PageContainer>
        <div className="flex items-center justify-between">
          <div>
            <Link href={"/"}>
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to bg-blue-600">
              NextBlog
            </h1> 
            </Link>
   
            {/* menu responsive */}
          </div>
          <HeaderNavigation />

          <div className="flex items-center">
            <div>menu</div>
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
