import LandingPage from "@/components/LandingPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function  Home() {
  
  const cookiesget = await cookies().get('isOnboarded')
  console.log('cookiesGet: ',cookiesget)
  if(cookiesget?.value === 'true') {
    redirect('/wallet');
  }
  
  return (
    <div>
      <LandingPage />
    </div>
  );
}
