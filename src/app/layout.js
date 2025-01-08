import { Host_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ClientWrapper from "./_components/ClientWrapper";
import { Toaster } from "@/components/ui/sonner";


const hostGrotesk = Host_Grotesk({ subsets: ['latin'] });


export const metadata = {
  title: "LogoCraft AI",
  description: "LogoCraft AI: Your ultimate AI-powered tool for creating stunning, personalized logos in no time.",
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl={process.env.WEBSITE_BASE_URL}>

      <html lang="en">

        <body
          className={`${hostGrotesk.className} antialiased`}
        >

          <ClientWrapper>
            
            {children}
          
          </ClientWrapper>

          <Toaster 
            richColors
            position='top-right'
            theme='light'
          />

        </body>

      </html>

    </ClerkProvider>
  );
}
