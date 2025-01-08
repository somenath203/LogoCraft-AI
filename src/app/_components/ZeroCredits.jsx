import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const ZeroCredits = () => {
  return (
    <Alert variant="destructive" className="w-full max-w-2xl">

        <AlertCircle className="h-4 w-4" />

        <AlertTitle>Zero Credits</AlertTitle>

        <AlertDescription>
            You've used up your credits! Purchase a credit pack to continue creating stunning logos.
        </AlertDescription>

    </Alert>
  )
}


export default ZeroCredits;