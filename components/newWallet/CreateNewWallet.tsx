"use client";
import { useOnboarded } from "@/lib/hook";
import onboardStepsAtom from "@/store/onboardStepsAtom";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import GeneratePhrase from "./GeneratePhrase";
import SetPassword from "./SetPassword";
import Warning from "./Warning";

function CreateNewWallet() {
  const router = useRouter();
  const { isOnboarded } = useOnboarded();
  const [shouldRedirect, setShouldRedirect] = useState(false); 

  useEffect(() => {
    console.log("Checking isOnboarded value:", isOnboarded);
    if (isOnboarded) {
      console.log("isOnboarded is true, setting redirect state");
      setShouldRedirect(true);  
    }
  }, [isOnboarded]);

  useEffect(() => {
    if (shouldRedirect) {
      console.log("Redirecting to /wallet after 500ms delay");
      // setTimeout(() => router.replace('/wallet'), 50); // Added delay for testing
      router.replace('/wallet')
    }
  }, [shouldRedirect, router]);

  const steps: ReactElement[] = [
    <Warning key="warning" />,
    <GeneratePhrase key="generatePhrase" />,
    <SetPassword key="setPassword" />,
  ];
  
  const [onboardSteps, setOnboardSteps] = useRecoilState(onboardStepsAtom);

  const handleNext = () => {
    if (onboardSteps < steps.length - 1) {
      setOnboardSteps((prevStep) => prevStep + 1);
    } else {
      console.log("Onboarding completed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {steps[onboardSteps]}
      {onboardSteps < steps.length - 1 && (
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default CreateNewWallet;
