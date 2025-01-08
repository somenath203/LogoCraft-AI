'use client';

import { Input } from "@/components/ui/input";
import pages_data from "../_data/pages_data";
import HeadingDescComponent from "./HeadingDescComponent";


const LogoDescription = ({ onHandleInputChange, allFormData }) => {

  return (
    <div className="my-5">

        <HeadingDescComponent title={pages_data.LogoDescTitle} description={pages_data.LogoDescDesc} />

        <Input 
          type='text' 
          placeholder='enter the description for your logo'
          className='p-4 border rounded-lg mt-5 w-full disabled:bg-gray-200'
          defaultValue={allFormData?.logodescription}
          onChange={(e) => onHandleInputChange(e.target.value)}
        />

    </div>
  )
}

export default LogoDescription;