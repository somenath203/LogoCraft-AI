'use client';

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import Header from "./Header";
import { UserDetailsContext } from "../_context/UserDetailContext";


const ClientWrapper = ({ children }) => {


  const { user } = useUser();

  const [ userInfoComingFromFirebaseDB, setUserInfoComingFromFirebaseDB ] = useState({});


  const getUserOrStoreUserFromFirebaseDB = async () => {

    try {

      const { data } = await axios.post('/api/users', {
        userFullName: user?.fullName,
        userEmailAddress: user?.primaryEmailAddress?.emailAddress,
      });


      if (data) {

        setUserInfoComingFromFirebaseDB(data);

      }
      
      
    } catch (error) {
      
      console.log('Something went wrong. Please try after sometime');
      
    }

  }


  useEffect(() => {

    user && getUserOrStoreUserFromFirebaseDB();

  }, [user]);
  
  return (
    <div>
        
        <UserDetailsContext.Provider value={{userInfoComingFromFirebaseDB, setUserInfoComingFromFirebaseDB}}>

          <Header />

          <div className="px-10 lg:px-32 xl:px-40 2xl:px-56">

            {children}

          </div>

        </UserDetailsContext.Provider>
    
    </div>
  )
}

export default ClientWrapper;