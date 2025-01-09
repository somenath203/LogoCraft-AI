'use client';

import { Coins, FileQuestion, LayoutDashboard, Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

import { UserDetailsContext } from "../_context/UserDetailContext";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";


const Page = () => {


  const { userInfoComingFromFirebaseDB } = useContext(UserDetailsContext);


  const [ userDetails, setUserDetails ] = useState();

  const [ loading, setLoading ] = useState(false);

  const [ logosOfTheUser, setLogosOfTheUser ] = useState([]);


  const userDetailsAndItsLogos = async () => {

    try {

      setLoading(true);
      
      const { data } = await axios.get(`/api/users?email=${userInfoComingFromFirebaseDB?.userEmailAddress}`);

      setUserDetails(data?.userDetails);

      setLogosOfTheUser(data?.logos);
      

    } catch (error) {
      
      toast.error('Something went wrong. Please try after sometime.', {
        duration: 5500
      });
      
    } finally {

      setLoading(false);

    }

  }


  const onDownloadLogoImage = (logoImage) => {

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



  useEffect(() => {

    if (userInfoComingFromFirebaseDB?.userEmailAddress) {

      userDetailsAndItsLogos();
      
    }

  }, [userInfoComingFromFirebaseDB]);


  return (
    <div className="min-h-screen flex justify-center mt-14">


      <div className="w-full">

        
        <p className="text-2xl lg:text-3xl font-rose-400 font-bold tracking-wider text-center mb-8 text-rose-500">Dashboard</p>


        <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-3 lg:gap-5">

          <Link href='/payment' className="p-6 w-full lg:w-1/2 h-32 border-2 rounded-xl shadow-sm flex flex-col gap-2 hover:cursor-pointer hover:bg-slate-50 cursor-pointer transition-all duration-300">

            <p className="tracking-wider">Credits Available</p>

            <div className="flex items-center gap-2">

              <p> <Coins size={40} className="text-yellow-500 font-bold" /> </p>

              {loading ? <Loader2 className="animate-spin duration-700" /> : <p className={`text-2xl font-bold ${userDetails?.credits === 0 && 'text-red-400'}`}> {userDetails?.credits} </p>}

            </div>

          </Link>

          <Link href='/create-logo-form' className="p-6 w-full lg:w-1/2 h-32 border-2 rounded-xl shadow-sm flex flex-col gap-2 hover:cursor-pointer hover:bg-slate-50 cursor-pointer transition-all duration-300">

            <p className="tracking-wider">Total Logos Created</p>

            <div className="flex items-center gap-2">

              <p> <LayoutDashboard size={40} className="text-blue-500 font-bold" /> </p>

              {loading ? <Loader2 className="animate-spin duration-700" /> : <p className={`text-2xl font-bold ${logosOfTheUser?.length === 0 && 'text-red-400'}`}> {logosOfTheUser?.length} </p>}

            </div>

          </Link>

        </div>


        <div className={`${logosOfTheUser?.length !== 0 ? 'mt-10' : 'mt-14'} mb-10`}>

         {logosOfTheUser?.length === 0 && <div className="flex flex-col justify-center items-center gap-4">

            {loading && <Loader2 size={50} className="animate-spin duration-700" />}

            {!loading && <>

              <FileQuestion size={80} className="text-primary font-extrabold" />

              <span className="text-center text-lg lg:text-xl text-rose-400">No Logos Found. Please create one.</span>

            </>}

         </div>}

         {logosOfTheUser?.length !== 0 && (

          <>
            
            <p className="text-center text-lg lg:text-xl mb-8 font-semibold tracking-wider">Click on any image to download it</p>

            <div className="flex flex-col justify-center items-center gap-4">
            
              {loading && <Loader2 size={50} className="animate-spin duration-700" />}

              {!loading && <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                
                {logosOfTheUser?.map((logo, index) => (

                  <div 
                    key={index} 
                    className="hover:scale-105 transition-all cursor-pointer duration-500"
                    onClick={() => onDownloadLogoImage(logo?.logo)}
                  >

                    <Image src={logo?.logo} alt={logo?.title} width={400} height={200} className="w-full rounded-xl" />

                    <h2 className="text-center text-lg font-medium mt-2">{logo?.title}</h2>

                    <p className="text-sm text-gray-500 text-center">{logo?.description}</p>

                  </div>

                ))}

            </div>}

          </div>

          </>
         )}


        </div>


      </div>

    </div>
  )
}

export default Page;