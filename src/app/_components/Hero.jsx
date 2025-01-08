'use client';

import { useContext, useState } from "react";
import { useClerk, useAuth, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import landing_page_data from "../_data/pages_data";
import { Button } from "@/components/ui/button";
import { UserDetailsContext } from "../_context/UserDetailContext";
import ZeroCredits from "./ZeroCredits";


const Hero = () => {


  const [logoTitleInput, setLogoTitleInput] = useState("");

  const { userInfoComingFromFirebaseDB } = useContext(UserDetailsContext);


  const router = useRouter();


  const { openSignIn } = useClerk();

  const { isSignedIn } = useAuth();


  const handleSignInOrSignUp = async () => {

    if (isSignedIn) {

      router.push(`create-logo-form?title=${logoTitleInput ? logoTitleInput : undefined}`);

    } else {

      try {

        openSignIn({
          mode: "modal",
          afterSignInUrl: `create-logo-form?title=${logoTitleInput ? logoTitleInput : undefined}`,
          afterSignUpUrl: `create-logo-form?title=${logoTitleInput ? logoTitleInput : undefined}`,
        });

      } catch (error) {

        console.error("Error during sign-in or sign-up:");

      }

    }

  };


  return (
    <div className="flex flex-col items-center gap-5 mt-20 lg:mt-32">

      <h2 className="text-primary text-4xl lg:text-5xl text-center font-bold">
        {landing_page_data.HeroHeading}
      </h2>

      <h2 className="text-4xl lg:text-5xl text-center font-bold">
        {landing_page_data.HeroSubHeading}
      </h2>

      <p className="text-lg text-gray-500 text-center">
        {landing_page_data.HeroDesc}
      </p>

      <div className="w-full max-w-2xl flex gap-2 mt-10">

        <Input
          type="text"
          placeholder={landing_page_data.InputPlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
          onChange={(e) => setLogoTitleInput(e.target.value)}
          required
        />

        <SignedIn>

          <Button disabled={userInfoComingFromFirebaseDB?.credits === 0} className="w-2/5" onClick={() => router.push(`create-logo-form?title=${logoTitleInput ? logoTitleInput : undefined}`)}>
            Submit
          </Button>

        </SignedIn>

        <SignedOut>

          <Button className="w-2/5" onClick={handleSignInOrSignUp}>
            Submit
          </Button>

        </SignedOut>

      </div>

      {userInfoComingFromFirebaseDB?.credits === 0 && <ZeroCredits />}

    </div>
  );
};


export default Hero;
