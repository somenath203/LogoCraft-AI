'use client';

import Image from "next/image";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import HeadingDescComponent from "../_components/HeadingDescComponent";
import { Button } from "@/components/ui/button";
import { UserDetailsContext } from "../_context/UserDetailContext";


const Page = () => {


  const { user } = useUser();

  const { userInfoComingFromFirebaseDB, setUserInfoComingFromFirebaseDB } = useContext(UserDetailsContext);

  const [cashFree, setCashFree] = useState(null);


  const router = useRouter();


  const initializeCashFreeSDK = async () => {

    try {

      const cashfreeInstance = await load({ mode: 'sandbox' });

      setCashFree(cashfreeInstance);

    } catch (error) {

      console.error('Error initializing Cashfree SDK:');

    }

  };


  const generateSessionIDAndOrderIdForCashFreePayment = async () => {

    try {

      const { data } = await axios.post('/api/make-payment', {
        fullName: user?.fullName, 
        emailAddress: user?.primaryEmailAddress?.emailAddress
      });

      if (data?.success) {

        return {
          sessionId: data?.data?.payment_session_id,
          orderId: data?.data?.order_id,
        };

      }

    } catch (error) {

      console.error('Error generating session ID:');

    }

  };


  const verifyPayment = async (orderId) => {

    try {


      const { data } = await axios.post('/api/verify-payment', { 
        order_id: orderId,
        customer_email: user?.primaryEmailAddress?.emailAddress,
        userCredits: userInfoComingFromFirebaseDB?.credits
      });

  
      if (data?.success) {

        console.log(data?.data?.length);

        if (data?.data?.length === 0) {

          toast.info('Payment has been cancelled');
          
        } else if (data?.data?.length === 1) {

          toast.success('Payment done successfully');

          setUserInfoComingFromFirebaseDB((prevState) => ({
            ...prevState, 
            credits: data?.updatedCredits, 
          }));
          
          router.refresh();

        }

      }


    } catch (error) {

      console.error('Error verifying payment:');

    }

  };



  const handlePayment = async () => {

    if (!cashFree) {

      console.error('Cashfree SDK not initialized');

      return;

    }
  
    try {

      const sessionAndOrderID = await generateSessionIDAndOrderIdForCashFreePayment();
  
      const paymentCheckoutOptions = {
        paymentSessionId: sessionAndOrderID?.sessionId,
        redirectTarget: '_modal',
      };
  
      cashFree.checkout(paymentCheckoutOptions).then(() => {

        console.log('Payment initiated');
  

        if (userInfoComingFromFirebaseDB) {

          verifyPayment(sessionAndOrderID?.orderId);

        }

      })
      .catch((error) => {


        if (error.message === 'Payment cancelled') {

          console.log('User cancelled the payment.');

          toast.info('Payment was cancelled by the user.');

        } else {

          console.error('Error during payment');

          toast.error('An error occurred during payment.');

        }

      });

    } catch (error) {

        console.error('Error during payment.');

    }

  };


  useEffect(() => {

    initializeCashFreeSDK();

  }, []);


  return (
    <div className="min-h-screen flex flex-col gap-8 items-center mt-20 text-center">

        <HeadingDescComponent title='Buy Credits' description='Need more credits? Easily purchase more and continue creating stunning logos.' />

        <p className="text-xl tracking-wide font-medium text-center">Credits Remaining: <span className='text-primary font-semibold'>{userInfoComingFromFirebaseDB?.credits}</span> </p>
            
        <div className="flex flex-col items-center justify-center gap-4 border p-10 rounded-xl shadow-lg">

            <Image src='/coin.png' alt="coin logo" height={100} width={100} />

            <p className="text-xl font-semibold">

                <span className="font-bold">Rs. 300</span> for <span className="font-bold">20 credits</span>
                
            </p>

            <Button className='py-6 px-24 text-lg' onClick={handlePayment}>Purchase</Button>

        </div>

    </div>
  )
}

export default Page;