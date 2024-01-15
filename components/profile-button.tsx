"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";


export default function ProfileButton() {
  // recupération de la session crée par nextAuth

  // useEffect (()=>
  // {
  //    const { data: session, status } = useSession(null);
  // },[])

  const { data: session, status } = useSession();
  const gg = useSession();

  // user connected -> avatar + menu

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {session && session.user && (
              <AvatarImage
                src={session.user?.image || "/img/default-avatar.jpg"}
              />
            )}
            <AvatarFallback className="bg-green-700">Connected</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (status ==="loading") {
    return <p>...</p>;
  }

  // user NOT connected -> btn login
  return (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}
