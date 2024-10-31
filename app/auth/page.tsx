import { AuthForm } from '@/components/Auth'
import { Input } from '@/components/ui/input'
import React from 'react'

function auth() {
  return (
    <>
        <h1 className='text-3xl'>Enter Password to access the wallet</h1>
        <AuthForm />
    </>
  )
}

export default auth