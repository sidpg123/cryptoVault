import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function fetchCookie(key: string) {
  const response = await fetch(`/api/get-cookies?key=${key}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  // console.log('forem fetchCookie function', data)
  return data.value;
}

export function useOnboarded() {
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const isOnboarded = await fetchCookie('isOnboarded');
        // console.log('isOnboarded inside the hook', isOnboarded)
        setIsOnboarded(isOnboarded);

      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  return { isOnboarded };
}

export function useIsAuthenticated() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const isAuthenticated = await fetchCookie('isAuthenticated');
        // console.log('isAuthenticated inside the hook', isAuthenticated)
        setIsAuthenticated(isAuthenticated);

      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  return { isAuthenticated };
}