'use client';

import { Suspense, useContext, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import LogoTitle from "../_components/LogoTitle";
import LogoDescription from "../_components/LogoDescription";
import LogoColorPalette from "../_components/LogoColorPalette";
import LogoDesign from "../_components/LogoDesign";
import LogoIdea from "../_components/LogoIdea";
import LogoResponse from "../_components/LogoResponse";
import { UserDetailsContext } from "../_context/UserDetailContext";


const Page = () => {


  const [ step, setStep ] = useState(1);

  const [ allFormData, setFormData ] = useState({});

  const { userInfoComingFromFirebaseDB } = useContext(UserDetailsContext);

  const router = useRouter();


  const onHandleInputChange = (field, value) => {

    setFormData((prevValue) => ({
      ...prevValue, 
      [field]: value, 
    }));

  };


  const redirectUserToGenerateLogoPageOnClickingGenerateLogoButton = () => {

    router.push('/generate-logo');

  }


  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 size={50} className="animate-spin duration-700" /></div>}>

      <div className="my-14 p-10 border rounded-xl">

        {step === 1 ? (

          <LogoTitle
            onHandleInputChange={(value) => onHandleInputChange('logotitle', value)} 
          />

        ) : (

          step === 2 ? (

            <LogoDescription
              onHandleInputChange={(value) => onHandleInputChange('logodescription', value)} 
              allFormData={allFormData}
            />

          ) : (

            step === 3 ? (

              <LogoColorPalette
                onHandleInputChange={(value) => onHandleInputChange('logocolorpalette', value)} 
                allFormData={allFormData}
              />

            ) : (

              step === 4 ? (

                <LogoDesign
                  onHandleInputChange={(value) => onHandleInputChange('logodesign', value)} 
                  allFormData={allFormData}
                />

              ) : step === 5 ? (

                <LogoIdea
                  onHandleInputChange={(value) => onHandleInputChange('logoidea', value)} 
                  allFormData={allFormData}
                />

              ) : step === 6 ? (

                <LogoResponse allFormData={allFormData} />

              ) : null

            )

          )

        )}

        <div className="flex items-center justify-between mt-5">

          {step !== 1 && <Button disabled={userInfoComingFromFirebaseDB?.credits === 0} variant='outline' className='flex items-center gap-1' onClick={() => setStep(step - 1)}>

            <ArrowLeft />

            <span>Previous</span>

          </Button>}

          {step !== 6 && userInfoComingFromFirebaseDB?.credits !== 0 && <Button disabled={userInfoComingFromFirebaseDB?.credits === 0} className='flex items-center gap-1' onClick={() => setStep(step + 1)}>

            <span>Next</span>
            
            <ArrowRight />

          </Button>}

          {step === 6 && <>

            <Button 
              className='flex items-center gap-2'
              disabled={!allFormData?.logotitle || !allFormData?.logodescription || !allFormData?.logocolorpalette || !allFormData?.logodesign || !allFormData?.logoidea}
              onClick={redirectUserToGenerateLogoPageOnClickingGenerateLogoButton}
            >

              Next

            </Button>

          </>}

        </div>


        {step === 6 && <div className="mt-3 flex flex-col items-end justify-center gap-2">
            
          {!allFormData?.logotitle && <p className="font-medium text-red-500">Logo Title is missing.</p>}

          {!allFormData?.logodescription && <p className="font-medium text-red-500">Logo Description is missing.</p>}
                
          {!allFormData?.logocolorpalette && <p className="font-medium text-red-500">Logo Color Palette is missing.</p>}
                
          {!allFormData?.logodesign && <p className="font-medium text-red-500">Logo Design is missing.</p>}

          {!allFormData?.logoidea && <p className="font-medium text-red-500">Logo Idea is missing.</p>}

        </div>}


      </div>

    </Suspense>
  )
}


export default Page;