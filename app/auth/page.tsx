"use client"

import { AuthForm } from '@/components/Auth'
import { useRouter } from 'next/navigation';



function auth() {
  const router = useRouter();
  async function onSuccess() {
    try {
      const response = await fetch(
        "/api/set-cookie?key=isAuthenticated&value=true"
      );
  
      if (!response.ok) {
        throw new Error("Failed to set cookie");
      }
  
      const cookieData = await response.json();
      console.log(cookieData);
      router.push("/wallet");
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }
  return (
    <>
        <h1 className='text-3xl'>Enter Password to access the wallet</h1>
        <AuthForm onSuccess={onSuccess}/>
    </>
  )
}

export default auth