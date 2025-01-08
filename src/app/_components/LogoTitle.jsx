'use client';

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";

import { Input } from "@/components/ui/input";
import pages_data from "../_data/pages_data";
import HeadingDescComponent from "./HeadingDescComponent";
import { UserDetailsContext } from "../_context/UserDetailContext";
import ZeroCredits from "./ZeroCredits";


const LogoTitle = ({ onHandleInputChange }) => {


  const searchParams = useSearchParams();
  
  const logoTitleInputFromSearchParams = searchParams.get('title') ? searchParams.get('title') : "";
  
  
  const [inputValue, setInputValue] = useState(logoTitleInputFromSearchParams);
  
  const { userInfoComingFromFirebaseDB } = useContext(UserDetailsContext);


  useEffect(() => {

    if (logoTitleInputFromSearchParams) {

      onHandleInputChange(logoTitleInputFromSearchParams);

    }

  }, []); 


  const handleChange = (value) => {
    
    setInputValue(value);
    
    onHandleInputChange(value); 
  
  };


  return (
    <div className="my-10">

      <HeadingDescComponent 
        title={pages_data.LogoTitle} 
        description={pages_data.LogoTitleDesc} 
      />

      <Input 
        type="text" 
        placeholder="Enter the title for your logo"
        className="p-4 border rounded-lg mt-5 w-full"
        value={inputValue === 'undefined' ? '' : inputValue} 
        onChange={(e) => handleChange(e.target.value)} 
        disabled={userInfoComingFromFirebaseDB?.credits === 0}
      />

      <div className="mt-3">

        {userInfoComingFromFirebaseDB?.credits === 0 && <ZeroCredits />}

      </div>
      
    </div>
  );
};

export default LogoTitle;
