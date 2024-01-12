"use client"

import PageContainer from '@/components/page-container'
import PageTitle from '@/components/ui/page-title'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Github, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {

  const onLogin =(provider: string)=>{
    signIn(provider)
  }
 
  return (
    <PageContainer>
      <PageTitle title="Login or regisgter" />
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <Button onClick={()=>onLogin("github")}>
          <Github className="mr-3" />
          Sign in with GitUp
        </Button>
        <Button onClick={()=>onLogin("google")}>
          <Mail className="mr-3" />
          Sign in with Google
        </Button>
      </div>
    </PageContainer>
  );
}
