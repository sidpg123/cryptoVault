import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function LandingPage() {
  // const isOnboarded = request.cookies.get('isOnboarded')?.value;
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <Link href={"/createNewWallet"}>
          <Button className="gradient-to-tr" >Create a new Wallet</Button>
        </Link>

        <Link href={"/importWallet"}>
          <Button variant={"default"}>Import Wallet</Button>
        </Link>

      </div>
    </>
  );
}

export default LandingPage;
