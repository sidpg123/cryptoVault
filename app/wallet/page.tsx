"use client";
import Header from '@/components/Header';
import { useIsAuthenticated, useOnboarded } from '@/lib/hook';
import { useRouter } from 'next/navigation';


function Wallet() {
  const router = useRouter();
  const { isOnboarded } = useOnboarded(); 
  const {isAuthenticated} = useIsAuthenticated(); 
  // const authh = useRecoilValue(authAtom); 
  console.log('isOnboarded usign hook:', isOnboarded);
  console.log('isAUthenticated usign hook:', isAuthenticated);
  

  if (isOnboarded === false ) router.replace('/');
  if (isAuthenticated === false ) router.replace('/auth');

  return (
    <div>
      <Header />
      
      <h1>Wallet</h1>
      <p>Is Onboarded: {isOnboarded !== null ? isOnboarded : 'Loading...'}</p>
    </div>
  );
}

export default Wallet;
