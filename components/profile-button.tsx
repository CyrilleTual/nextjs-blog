import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function ProfileButton() {

    // user connected -> avatar + menu
    // user NOT connected -> btn login

  return (
     <Link href="/login">
        <Button>Login</Button>
     </Link>
  )
}
