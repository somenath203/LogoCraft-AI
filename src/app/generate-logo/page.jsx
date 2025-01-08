'use client';

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Loader, Sparkle, DownloadIcon, LayoutDashboard, AlertCircle } from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

import { UserDetailsContext } from "../_context/UserDetailContext";
import prompt_data from "../_data/prompt_data";
import { Button } from "@/components/ui/button";
import ZeroCredits from "../_components/ZeroCredits";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const Page = () => {


  const { userInfoComingFromFirebaseDB } = useContext(UserDetailsContext);


  const [ formDataFromLocalStorage, setFormDataFromLocalStorage ] = useState({});

  const [ doesAllFieldsExistsInTheDataComingFromLocalStorage, setDoesAllFieldsExistsInTheDataComingFromLocalStorage ] = useState(true);

  const [ loading, setLoading ] = useState(false);

  const [ logoImage, setLogoImage ] = useState();


  const generateAiLogo = async () => {

    try {

      setLoading(true);
      
      const promptToGenerateTheLogo = prompt_data.LOGO_PROMPT
                                        .replace('{logoTitle}', formDataFromLocalStorage?.logotitle)
                                        .replace('{logoDesc}', formDataFromLocalStorage?.logodescription)
                                        .replace('{logoColor}', formDataFromLocalStorage?.logocolorpalette)
                                        .replace('{logoDesign}', formDataFromLocalStorage?.logodesign?.title)
                                        .replace('{logoPrompt}', formDataFromLocalStorage?.logodesign?.prompt)
                                        .replace('{logoIdea}', formDataFromLocalStorage?.logoidea);


      
      const { data } = await axios.post(`/api/ai-generate-logo`, {
        prompt: promptToGenerateTheLogo,
        titleOfTheLogo: formDataFromLocalStorage?.logotitle,
        descriptionOfTheLogo: formDataFromLocalStorage?.logodescription,
        emailAddressOfTheUserWhoCreatedTheLogo: userInfoComingFromFirebaseDB?.userEmailAddress,
        creditsOfTheUser: userInfoComingFromFirebaseDB?.credits
      });

      
      if (data) {

        setLogoImage(data?.logoImage);

        localStorage.removeItem('allFormData');

        toast.success('Logo generated successfully.', {
          duration: 3500
        });

      }
      

    } catch (error) {

      toast.error('Something went wrong or the model is unable to generate the logo right now. Please try again after sometime.', {
        duration: 6000
      });
      
    } finally {

      setLoading(false);

    }

  }


  const onDownloadLogoImage = () => {

    const link = document.createElement("a");

    link.href = logoImage;

    link.download = `logocraft_ai_${uuidv4()}.png`; 

    document.body.appendChild(link);

    link.click();

    toast.success('Logo downloaded successfully.', {
      duration: 2500
    });

    document.body.removeChild(link);

  }

  
  const checkIfAllFieldsComingFromLocalStorageExistOrNot = (formData) => {

    return (
      formData?.logotitle &&
      formData?.logodescription &&
      formData?.logocolorpalette &&
      formData?.logodesign?.title &&
      formData?.logodesign?.prompt &&
      formData?.logoidea
    );

  };


  useEffect(() => {

    if (typeof window !== undefined && userInfoComingFromFirebaseDB?.userEmailAddress) {

      const storage = localStorage.getItem('allFormData');

      if (storage) {

        const parsedData = JSON.parse(storage);
      
        if (Object.keys(parsedData).length === 0) {

          setDoesAllFieldsExistsInTheDataComingFromLocalStorage(false);

        } else {

          setFormDataFromLocalStorage(parsedData);

          
          setDoesAllFieldsExistsInTheDataComingFromLocalStorage(checkIfAllFieldsComingFromLocalStorageExistOrNot(parsedData));
        
        }
      } else {

        setDoesAllFieldsExistsInTheDataComingFromLocalStorage(false);

      }

    }

  }, [userInfoComingFromFirebaseDB]);

  
  return (
    <div className='min-h-screen flex flex-col items-center mt-24'>

      {!loading && !logoImage && <div className="flex flex-col items-center justify-center gap-8">

        <p className="text-center font-bold text-primary text-2xl">Click the button below to generate your Logo</p>

        {!doesAllFieldsExistsInTheDataComingFromLocalStorage ? <>

          <Alert variant="destructive" className="w-full max-w-2xl">

              <AlertCircle className="h-4 w-4" />

              <AlertTitle>Fields Missing</AlertTitle>

              <AlertDescription>
                Some required fields for generating the logo are missing, or there’s no data available at the moment. 
              </AlertDescription>

          </Alert>

        </> : userInfoComingFromFirebaseDB?.credits !== 0 ? <div className='flex flex-col lg:flex-row items-center justify-center gap-2 px-20 py-10 bg-rose-500 rounded-2xl shadow-xl cursor-pointer' onClick={generateAiLogo}>

          <Sparkle size={32} className="text-white" />

          <span className='text-2xl text-white'>Generate Logo</span>

          </div> : <ZeroCredits />}

      </div>} 

      {loading && !logoImage && <div className="flex flex-col items-center justify-center">
        
        <p className="text-xl lg:text-2xl font-bold text-rose-500">✨Your logo is being created</p>

        <Loader className="mt-2 animate-spin duration-1000" />

        <Image src={'/loading.gif'} alt='loading' width={200} height={200} className='mt-6'/>

        <p className="text-xl lg:text-2xl mt-3 text-center">Please do not refresh the page while the logo is getting generated.</p>

        <p className="text-lg lg:text-xl mt-3 text-center">Logo generation may take a few minutes. Please be patient while something amazing is being created.</p>

      </div>}     

      {!loading && logoImage && <div className='flex flex-col items-center justify-center gap-5'>

        <p className="text-rose-500 text-xl font-semibold tracking-wide">Your Image is Ready</p>

        <Image src={logoImage} alt='logo' width={300} height={300} className='rounded-xl' />

          <div className='mt-4 flex items-center justify-center gap-5'>

            <Button onClick={() => onDownloadLogoImage()}> <DownloadIcon /> Download </Button>

            <Link href={'/dashboard'}>

              <Button variant="outline"> <LayoutDashboard /> Dashboard </Button>
            
            </Link>

          </div>

      </div>}

    </div>
  )
}


export default Page;