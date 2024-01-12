"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileButton() {
  // recupération de la session crée par nextAuth

  const { data: session, status } = useSession();
  const gg = useSession();

  // user connected -> avatar + menu
  // user NOT connected -> btn login

  if (status === "authenticated") {
    return (
      <Avatar>
        {session && session.user && session.user.image !== null && (
          <AvatarImage src={session.user.image} />
        )}
        <AvatarFallback className="bg-green-700">Connected</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}
