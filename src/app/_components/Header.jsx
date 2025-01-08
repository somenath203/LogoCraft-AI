'use client';


import { CircleChevronUp } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";


const Header = () => {


  const { openSignIn } = useClerk();

  const { isSignedIn } = useAuth();


  const handleSignInOrSignUp = async () => {

    if (isSignedIn) {

      router.push(`create-logo-form`);

    } else {

      try {

        openSignIn({
          mode: "modal",
          afterSignInUrl: `create-logo-form`,
          afterSignUpUrl: `create-logo-form`,
        });

      } catch (error) {

        console.error("Error during sign-in or sign-up:");

      }

    }

  };


  return (
    <div className="px-10 lg:px-32 xl:px-40 2xl:px-56 p-4 flex flex-col lg:flex-row gap-2 lg:gap-0 items-center justify-between shadow-sm">

      <Link href='/' className="cursor-pointer">

        <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2">

          <CircleChevronUp className="size-10 font-bold text-rose-500" />

          <span className="font-semibold text-xl">LogoCraft AI</span>

        </div>

      </Link>

      <div className="flex flex-col lg:flex-row items-center gap-5">

        <div className="flex gap-2">

          <SignedIn>

            <Link href='/dashboard'>

              <Button>Dashboard</Button>

            </Link>

          </SignedIn>

          <SignedIn>

            <Link href='/payment'>

              <Button variant='secondary' className="flex items-center justify-center gap-1">

                <Image src='/coin.png' alt="coin image" width={25} height={25} />

                <span>Credits</span>

              </Button>

            </Link>

          </SignedIn>

        </div>

        <SignedIn>

          <UserButton 
            appearance={{ 
              elements: { avatarBox: { width: '2.3rem', height: '2.3rem' }},
            }}
          />

        </SignedIn>

      </div>


      <SignedOut>

        <Button onClick={handleSignInOrSignUp}>Get Started</Button>

      </SignedOut>

    </div>
  )
}

export default Header;