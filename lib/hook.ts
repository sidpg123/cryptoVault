import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function fetchOnboardingStatus() {
  const response = await fetch('/api/get-cookies');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.isOnboarded;
}

export function useOnboarded() {
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const isOnboarded = await fetchOnboardingStatus();
        setIsOnboarded(isOnboarded);

      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  return { isOnboarded };
}
