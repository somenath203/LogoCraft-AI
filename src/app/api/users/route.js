import { collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

import { db } from "@/firebaseConfig";


export async function POST(req) {

    try {

        const { userFullName, userEmailAddress } = await req.json();


        const docRef = doc(db, 'users', userEmailAddress);


        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            return NextResponse.json(docSnap.data());

        } else {

            const userData = {
                userFullName: userFullName,
                userEmailAddress: userEmailAddress,
                credits: 10
            };


            await setDoc(doc(db, 'users', userEmailAddress), {
                ...userData
            });
            

            return NextResponse.json(userData);

        }

        
    } catch (e) {
        
        return NextResponse.json(
            {
                error: e
            }
        )

    }

}


export async function GET(req) {

  try {


    const searchParams = req.nextUrl.searchParams;

    const userEmailAddress = searchParams.get('email');
    

    const userDocRef = doc(db, "users", userEmailAddress);

    const userDocSnap = await getDoc(userDocRef);


    if (!userDocSnap.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }


    const userData = userDocSnap.data();


    const logosCollectionRef = collection(db, "users", userEmailAddress, "logos");


    const logosSnapshot = await getDocs(logosCollectionRef);


    const logos = logosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    const response = {
      userDetails: userData,
      logos: logos,
    };


    return NextResponse.json(response, { status: 200 });

  } catch (e) {

    return NextResponse.json(
      { error: e.message || "Something went wrong" },
      { status: 500 }
    );

  }

}
