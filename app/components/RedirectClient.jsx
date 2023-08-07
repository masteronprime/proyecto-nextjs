'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
const RedirectClient = ({role}) => {

  const session = useSession() || null
  const router = useRouter()

  useEffect(() => {
    if (session?.status === 'authenticated' && role==="admin" ){
      router.push('/administrador')
      router.refresh()
      return
    }
    if (session?.status === 'authenticated' && role === "user") {
      router.push('/constituyentes')
      router.refresh()
      return
    }
    if (session?.status !== 'authenticated') {
      router.push('/')
      router.refresh()
      return
    }
  }, [session?.status, router, role])


  return null;
}
 
export default RedirectClient;