import Image from "next/image";
import { useState } from "react";

import logo_Design_prompts from "../_data/logo_Design_prompts";
import pages_data from "../_data/pages_data";
import HeadingDescComponent from "./HeadingDescComponent";


const LogoDesign = ({ onHandleInputChange, allFormData }) => {


  const [ logoStyleSelectedByUser, setLogoStyleSelectedByUser ] = useState(allFormData?.logodesign?.title);


  return (
    <div className="my-5 h-96 overflow-y-auto">

      <HeadingDescComponent title={pages_data.LogoDesignTitle} description={pages_data.LogoDesignDesc} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-3 mx-5">
        
        {logo_Design_prompts.map((design, index) => (

          <div 
            key={index} 
            className={`flex p-1 cursor-pointer ${logoStyleSelectedByUser === design.title && 'border-2 rounded-lg border-primary'}`}
            onClick={() => {
              setLogoStyleSelectedByUser(design.title)
              onHandleInputChange(design)
            }}
          >

            <Image 
              src={design.image} 
              alt={design.title} 
              width={300} 
              height={200}
              className="w-full rounded-xl h-[150px] object-cover"
            />

          </div>

        ))}

      </div>

    </div>
  )
}


export default LogoDesign;