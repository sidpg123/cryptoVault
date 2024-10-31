"use client";
import { useOnboarded } from '@/lib/hook';
import { fetchCookies } from '@/lib/utils';
import authAtom from '@/store/authAtom';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';


function Wallet() {
  const router = useRouter();
  const { isOnboarded } = useOnboarded(); 
  const authh = useRecoilValue(authAtom); 
  console.log('isOnboarded usign hook:', isOnboarded)

  if (isOnboarded === false) router.replace('/');

  return (
    <div>
      <h1>Wallet</h1>
      <p>Is Onboarded: {isOnboarded !== null ? isOnboarded : 'Loading...'}</p>
    </div>
  );
}

export default Wallet;
