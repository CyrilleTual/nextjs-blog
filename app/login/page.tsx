import PageContainer from '@/components/page-container'
import PageTitle from '@/components/ui/page-title'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Github, Mail } from 'lucide-react'

export default function LoginPage() {
  return (
    <PageContainer>
      <PageTitle title="Login or regisgter" />
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <Button>
          <Github className="mr-3" />
          Sign in with GitUp
        </Button>
        <Button>
          <Mail className="mr-3" />
          Sign in with Google
        </Button>
      </div>
    </PageContainer>
  );
}
