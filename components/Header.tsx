import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "./Navbar";
import WellcomeMessage from "./WellcomeMessage";
import { Button } from "./ui/button";
import CustomDialog from "./Dialog";

function Header() {
  useGSAP(() => {
    gsap.from(".animate", {
      opacity: 0,
      y: -10,
      ease: "sine.in",
      duration: 1,
      stagger: {
        each: 0.2,
      },
    });
    gsap.from('.message', {
      opacity: 0,
      duration:1
    })
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="animate">
        <Navbar />
      </div>
      <header className="pt-10">
        <div className="animate">
          <WellcomeMessage />
        </div>
        <p className="message text-sm lg:text-base pt-2 text-[#89B6FD]">This is your personal crypto wallet</p>
        
        <CustomDialog />
      </header>
    </div>
  );
}

export default Header;
