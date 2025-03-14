import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

import { db } from "@/firebaseConfig";
import { AILogoPrompt } from "@/gemini-model-config";


export async function POST(req) {


    const { prompt, titleOfTheLogo, descriptionOfTheLogo, emailAddressOfTheUserWhoCreatedTheLogo, creditsOfTheUser } = await req.json();
    
    
    try {

        const res = await AILogoPrompt.sendMessage(prompt);

        const promptGeneratedByGemini = JSON.parse(res.response.text()).prompt;


        const responseFromImageCreationModel = await axios.post('https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA', promptGeneratedByGemini, {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
            },
            responseType: 'arraybuffer'
        });


        const buffer = Buffer.from(responseFromImageCreationModel?.data, 'binary');

        const base64Image= buffer.toString('base64');


        let updatedCredits;


        const base64ImageWithMime = `data:image/png;base64,${base64Image}`;


        if (base64ImageWithMime) {

            await setDoc(doc(db, 'users', emailAddressOfTheUserWhoCreatedTheLogo, 'logos', uuidv4()), {
                logo: base64ImageWithMime,
                title: titleOfTheLogo,
                description: descriptionOfTheLogo
            });

            const docRef = doc(db, 'users', emailAddressOfTheUserWhoCreatedTheLogo);

            updatedCredits = Math.max(0, Number(creditsOfTheUser) - 5); 

            await updateDoc(docRef, {
                credits: updatedCredits
            });
            
        }


        return NextResponse.json({
            logoImage: base64ImageWithMime,
            updatedCredits: updatedCredits
        }, { status: 200 });

        
    } catch (e) {

        return NextResponse.json(
            {
                error: e?.response?.data?.message
            }
        )

    }

}