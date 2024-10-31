"use client";
import onboardStepsAtom from "@/store/onboardStepsAtom";
import { useSetRecoilState } from "recoil";
import { PasswordInputFrom } from "../PassForm";

function SetPassword() {
  const setOnboardSteps = useSetRecoilState(onboardStepsAtom);
  
  return (
    <>
      <div>SetPassword</div>
      <p>This password is used for your local machine only</p>
      <p>
        This password is not related with blockchain, but it will be required
        for making transactions from your browser
      </p>
      <p>Remember this password</p>
      <button
        className="text-blue-700"
        onClick={() => setOnboardSteps((c) => c - 1)}
      >
        See phrase again
      </button>
      <PasswordInputFrom />
    </>
  );
}

export default SetPassword;
