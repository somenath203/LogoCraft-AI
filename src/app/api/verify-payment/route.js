import { NextResponse } from 'next/server';
import { Cashfree } from 'cashfree-pg';
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebaseConfig";


Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;



export async function POST(req) {

  try {


    const { order_id, customer_email, userCredits } = await req.json();


    const currentCredits = Number(userCredits);


    let updatedCredits;


    const cashfreeResponse = await Cashfree.PGOrderFetchPayments('2023-08-01', order_id);


    if (cashfreeResponse?.data) {

      updatedCredits = currentCredits + 20; 

      const docRef = doc(db, 'users', customer_email);

      await updateDoc(docRef, {
        credits: updatedCredits
      });

    }


    return NextResponse.json({
      success: true,
      data: cashfreeResponse?.data,
      updatedCredits: updatedCredits
    });


  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      { status: 500 }
    );

  }
  
}