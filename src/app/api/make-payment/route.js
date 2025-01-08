import { NextResponse } from 'next/server';
import { Cashfree } from 'cashfree-pg';
import { v4 as uuidv4 } from 'uuid';


Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


const generateOrderIDForCashFreePayment = () => {

    const uuid = uuidv4(); 

    return uuid.replace(/-/g, '').substring(0, 12); 

};


export async function POST(req) {

  try {


    const { fullName, emailAddress } = await req.json();


    const customerId = `${fullName.split(' ')[0]}${uuidv4().replace(/-/g, '').substring(1, 3)}`.toLowerCase();


    const paymentData = {
      order_amount: 300.0,
      order_currency: 'INR',
      order_id: generateOrderIDForCashFreePayment(),
      customer_details: {
        customer_id: customerId,
        customer_phone: '9999999999',
        customer_name: fullName,
        customer_email: emailAddress,
      },

    };


    const cashfreeResponse = await Cashfree.PGCreateOrder('2023-08-01', paymentData);


    return NextResponse.json({
      success: true,
      data: cashfreeResponse?.data,
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